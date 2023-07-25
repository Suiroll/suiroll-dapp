import {
  SUI_CLOCK_OBJECT_ID,
  TransactionBlock,
} from "@mysten/sui.js"
import {v4 as uuidv4} from "uuid";
import {post} from "./api";
import {strip0x} from "./utils";
import {
  SUIROLL_PACKAGE_ID, HOUSE_OBJECT_ID, GAME_OBJECT_TYPE, GAMES_KEY, CONFIG_OBJECT_ID
} from "./constants";

const send_play_tx = async (wallet, stake, seeds, userSelection) => {
  if (!wallet.connected) return

  const txb = new TransactionBlock();
  const [stakeCoin] = txb.splitCoins(txb.gas, [txb.pure(stake)]);

  txb.moveCall({
    target: `${SUIROLL_PACKAGE_ID}::suiroll::play`,
    typeArguments: ["0x2::sui::SUI"],
    arguments: [
      txb.object(CONFIG_OBJECT_ID),
      txb.object(HOUSE_OBJECT_ID),
      txb.pure(seeds),
      txb.pure(userSelection),
      stakeCoin,
      txb.object(SUI_CLOCK_OBJECT_ID),
    ],
  });

  // 0.006 SUI
  txb.setGasBudget(80_000_000) 

  const result = await wallet.signAndExecuteTransactionBlock({
    transactionBlock: txb,
    options: {
      showObjectChanges: true,
      showEffects: true,
    },
  });

  if(result.effects.status.status === "failure") {
    throw new Error(result.effects.status.error)
  }

  return result
}

export const play = async (wallet, userSelection, stake) => {
  // Createa and send `play` tx
  const seeds = [uuidv4(), uuidv4()]
  const result = await send_play_tx(wallet, stake, seeds, userSelection);
  const gameId = result.objectChanges.find(o => o.objectType === GAME_OBJECT_TYPE).objectId;
  const digest = result.digest;

  // Store in localstorage. If the next API call fails then we can retry even after browser refresh
  const games = JSON.parse(localStorage.getItem(GAMES_KEY));
  const newGamesSet = {...games, [gameId]: {digest, status: "pre-commit"}};
  localStorage.setItem(GAMES_KEY, JSON.stringify(newGamesSet));

  const body = {
    gameId: strip0x(gameId),
    player: strip0x(wallet.account.address),
    stake,
    seeds,
    userSelection,
    createdAt: Date.now(),
    txHash: digest,
  }
  await post(`${import.meta.env.VITE_SUIROLL_API}/games`, body);
  
  // update localstorage status
  newGamesSet[gameId].status = "created";
  localStorage.setItem(GAMES_KEY, JSON.stringify(newGamesSet));

  // reveal the result
  const response = await post(`${import.meta.env.VITE_SUIROLL_API}/games/${strip0x(gameId)}/results`);

  // Delete after API success
  delete newGamesSet[gameId];
  localStorage.removeItem(GAMES_KEY, JSON.stringify(newGamesSet));

  return response
}
