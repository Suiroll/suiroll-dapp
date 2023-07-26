import {useEffect, memo, useState, useCallback} from "react";
import DiceBox from "@3d-dice/dice-box-threejs";
import {useWallet} from "@suiet/wallet-kit";
import {toast} from "react-toastify";
import {play} from "../../../services/game";

const EVEN = 0;
const ODD = 1;

const DiceBoard = () => {
  const wallet = useWallet();

  const [box, setBox] = useState(null);
  const [selection, setSelection] = useState(-1);
  const [isRolling, setIsRolling] = useState(false);
  const [diceResult, setDiceResult] = useState(-1);
  const [stake, setStake] = useState(1);

  useEffect(() => {
    const run = async () => {
      const _box = new DiceBox("#dice-board", {
        framerate: (1/60),
        sounds: true,
        volume: 100,
        color_spotlight: 0xefdfd5,
        shadows: true,
        theme_surface:  "green-felt",
        sound_dieMaterial: 'plastic',
        theme_customColorset: null,
        theme_colorset: "white", // see available colorsets in https://github.com/3d-dice/dice-box-threejs/blob/main/src/const/colorsets.js
        theme_texture: "", // see available textures in https://github.com/3d-dice/dice-box-threejs/blob/main/src/const/texturelist.js
        theme_material: "glass", // "none" | "metal" | "wood" | "glass" | "plastic"
        gravity_multiplier: 400,
        light_intensity: 0.7,
        baseScale: 100,
        strength: 20, // toss strength of dice
        onRollComplete
      });
      
      await _box.initialize();
  
      setBox(_box);
    }

    run()
    .then(() => {
      console.log("Initialized")
    })
    .catch((error) => console.log("Error: ", error))

    return () => {
      document.querySelector("#dice-board > canvas").remove();
    }

  }, []);

  const onRollComplete = useCallback((results) => {
    console.log("Total ", results.total);
    setDiceResult(results.total);

    setTimeout(() => {
      setSelection(-1);
      setDiceResult(-1);
      setIsRolling(false);
    }, 2000)
  }, [selection, diceResult]);

  const roll = useCallback(async (e) => {
    e.preventDefault();
    
    setIsRolling(true);
    
    const {random1, random2} = await play(wallet, selection, stake * 1e9);

    console.log("Result ", random1, random2);

    box.roll(`2d6@${random1},${random2}`);
  }, [box, selection, stake]);

  useEffect(() => {
    if(diceResult === -1) return;

    if(selection === 0 && diceResult % 2 === 0) {
      toast.success("Result is Even. You won!");
    } else if(selection === 0 && diceResult % 2 !== 0) {
      toast.error("Result is Odd. Try again!");
    }

    if(selection === 1 && diceResult % 2 === 0) {
      toast.error("Result is Even. Try again!");
    } else if(selection === 1 && diceResult % 2 != 0) {
      toast.success("Result is Odd. You won!");
    }
  }, [diceResult]);
  
  const toggleSelection = (e) => {
    e.preventDefault();

    const newSelection = (selection + 1) % 2;
    setSelection(newSelection);
  }

  const disabledSelectionBtn = () => {
    return !isWalletConnected() || isRolling ? "btn-disabled" : "";
  }

  const disabledRollBtn = () => {
    return !isWalletConnected() || selection === -1 || isRolling || stake < 1 || stake > 100
    ? "btn-disabled"
    : "";
  }

  const inputAttrs = () => {
    return !isWalletConnected() || isRolling || selection === -1
    ? {disabled: true}
    : {}
  }

  const isWalletConnected = () => wallet.connected

  const renderInstructions = () => {
    if (!isWalletConnected()) {
      return <p className="text-center">Please Connect Your Wallet!</p>
    }

    return selection === -1
      ? <p className="text-center">
        Select Odd or Even and roll the dice. <a className="link link-warning" href="/faq" target="_blank">Instructions</a>
      </p>
      : null;
  }

  const renderSelectionBtn = () => {
    switch(selection) {
      case -1:
        return (
          <button
            className={"btn btn-neutral btn-block no-animation " + disabledSelectionBtn()}
            onClick={toggleSelection}>
              Odd or Even
          </button>
        );

      case ODD:
        return (
          <button
            className={"btn btn-accent btn-block no-animation " + disabledSelectionBtn()}
            onClick={toggleSelection}
          >
            Odd
          </button>
        );

      case EVEN:
        return (
          <button
            className={"btn btn-primary btn-block no-animation " + disabledSelectionBtn()}
            onClick={toggleSelection}
          >
            Even
          </button>
        );
    }
  }

  const renderSpinner = () => {
    return isRolling 
    ? <span className="loading loading-spinner"></span>
    : null;
  }

  const handleStakeChange = (event) => {
    setStake(event.target.value);
  };

  const getInputStyle = () => {
    if(stake > 100) {
      return " input-error "
    }

    return " input-accent ";
  }

  const renderAmountInput = () => {
    let attrs = inputAttrs();

    return (
      <div className="form-control self-center">
        <label className="input-group">
          <span>BET</span>
          <input
            type="number"
            value={stake}
            placeholder="Enter SUI Amount"
            {...attrs}
            className={getInputStyle() + " input input-bordered w-full max-w-xs "}
            onChange={handleStakeChange}
          />
          <span>SUI</span>
        </label>
      </div>
    )
  }
  
  return (
    <div className="col-start-1 col-span-2">
      <div>
        {renderInstructions()}
        <div id="dice-board"></div>
      </div>
      <div className="flex flex-col space-y-4">
        {renderSelectionBtn()}
        {renderAmountInput()}
        <button 
          className={"btn btn-active btn-success btn-block " + disabledRollBtn()}
          onClick={roll}
        >
          {renderSpinner()}
          Roll
        </button>
      </div>
    </div>
  );
}

export default memo(DiceBoard);
