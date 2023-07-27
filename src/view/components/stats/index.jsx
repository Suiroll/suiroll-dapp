import {memo, useEffect, useState} from "react";
import {useWallet} from "@suiet/wallet-kit";
import {get} from "../../../services/api";
import {strip0x, fromBase} from "../../../services/utils";

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
      <div className="stat place-items-center text-accent">
        <div className="stat-title">Total Earnings</div>
        <div className="stat-value">{stats.total_earnings && fromBase(stats.total_earnings, 9)} SUI</div>
        <div className="stat-desc">Total Games {stats.total_games}</div>
      </div>
      
      <div className="stat place-items-center text-secondary">
        <div className="stat-title">Users</div>
        <div className="stat-value">{stats.total_users}</div>
      </div>
      
      <div className="stat place-items-center text-primary">
        <div className="stat-title">You Earned</div>
        <div className="stat-value">{stats.your_earnings && fromBase(stats.your_earnings, 9)} SUI</div>
        <div className="stat-desc">Games Played {stats.your_games}</div>
      </div>
    </div>
  )
}

export default memo(Stats)
