import {memo, useEffect, useState} from "react";
import {useWallet} from "@suiet/wallet-kit";
import {get} from "../../../services/api";
import {strip0x} from "../../../services/utils";

const Stats = () => {
  const wallet = useWallet();
  const [stats, setStats] = useState({});

  useEffect(() => {
    const run = async () => {
      if (wallet.connected) {
        const result = await get(`${import.meta.env.VITE_SUIROLL_API}/stats/${strip0x(wallet.account.address)}`);
        setStats(result.stats)
      }
    }

    run()
    .then(() => {})
    .catch((error) => console.log("Error loading stars ", error))
  }, [wallet])

  return (
    <div className="stats shadow w-full">
      <div className="stat place-items-center">
        <div className="stat-title">Total Games</div>
        <div className="stat-value">{stats.total_games}</div>
        {/* <div className="stat-desc">From January 1st to February 1st</div> */}
      </div>
      
      <div className="stat place-items-center">
        <div className="stat-title">Users</div>
        <div className="stat-value text-secondary">{stats.total_users}</div>
        {/* <div className="stat-desc text-secondary">↗︎ 40 (2%)</div> */}
      </div>
      
      <div className="stat place-items-center">
        <div className="stat-title">Games You Played</div>
        <div className="stat-value">{stats.your_games}</div>
        {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
      </div>
    </div>
  )
}

export default memo(Stats)
