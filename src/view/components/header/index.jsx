import React from "react";
import {ConnectButton} from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import logo from "../../../assets/images/suiroll_logo.png"
import Leaderboard from "../leaderboard";

const Header = () => {
  return (
    <div className="navbar bg-neutral">
      <div className="flex-1">
        <img src={logo} width="50px"/>
      </div>
      <div className="flex-none">
      <div className="dropdown mr-4">
          <label tabIndex="0" className="btn btn-sm">Leaderboard</label>
          <div
            tabIndex="0"
            className={"shadow menu dropdown-content z-[1] bg-base-100 rounded-box "}
          >
            <Leaderboard />
          </div>
        </div>
        <div className="dropdown dropdown-end mr-5">
          <ConnectButton>Connect Wallet</ConnectButton>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
              <span className="text-xs">SR</span>
            </div>
          </div>
          </label>
          <ul tabIndex="0" className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
