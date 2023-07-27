import {memo, useEffect, useState} from "react";
import {get} from "../../../services/api";
import {fromBase, truncateAddress} from "../../../services/utils";

const LeaderBoard = () => {
  const [earnings, setEarnings] = useState([]);

  useEffect(() => {
    const run = async () => {
      const result = await get(`${import.meta.env.VITE_SUIROLL_API}/leaderboard`);
      setEarnings(result.earnings)
    }

    const intervalId = setInterval(() => {
      run()
      .then(() => {})
      .catch((error) => console.log("Error loading earnings data ", error))
    }, 10_000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])


  return (
    <div className="overflow-x-auto">
    <table className="table">
      <tbody>
        {
          earnings.map((earning, i) => {
            return (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{truncateAddress(earning.account)}</td>
                <td>{fromBase(earning.total_earnings, 9)} SUI</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  </div>
  )
}

export default memo(LeaderBoard)
