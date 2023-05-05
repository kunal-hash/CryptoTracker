import React from "react";
import "./style.css";
import Switch from "@mui/material/Switch";
import TemporaryDrawer from "./Drawer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const label = { inputProps: { "aria-label": "Switch demo" } };

function Header() {
  return (
    <div className="navbar">
      <div className="logo-wrapper">
        <h1 className="logo">
          CryptoTracker. {/* <span className="dot">.</span> */}
        </h1>
      </div>
      <div className="links">
        <div>
          <Switch className="toggle" {...label} defaultChecked />
        </div>
        <Link to="/" className="link link-home">
          <p>Home</p>
        </Link>
        <Link to="/compare" className="link link-compare">
          <p>Compare</p>
        </Link>
        <Link to="/watchlist" className="link link-watchlist">
          <p>Watchlist</p>
        </Link>
        <div>
          <Link to="/dashboard">
            <button
              className="dash-btn"
              onClick={() => {
                console.log("dashboard-clicked");
              }}
            >
              Dashboard
            </button>
          </Link>
        </div>
      </div>

      <div className="mobile-drawer">
        <TemporaryDrawer></TemporaryDrawer>
      </div>
    </div>
  );
}

export default Header;
