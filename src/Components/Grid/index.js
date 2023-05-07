import React, { useState } from "react";
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUp";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDown";
import { Link } from "react-router-dom";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { saveItemToWatchlist } from "../../Functions/saveItemToWatchlist";
import { removeItemFromWatchlist } from "../../Functions/removeItemFromWatchlist";

function Grid({ coin }) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [isCoinAdded, setIsCoinAdded] = useState(watchlist?.includes(coin.id));

  return (
    <Link to={`/coin/${coin.id}`}>
      <div
        className={`grid-container ${
          coin.market_cap_change_percentage_24h < 0 && "grid-container-red"
        }`}
      >
        <div className="info-flex-grid space-between">
          <div className="logo-wrapper-grid">
            <img className="coin-logo" src={coin.image}></img>
          </div>

          <div className="name-column-grid">
            <p className="coin-symbol-grid">{coin.symbol}</p>
            <p className="coin-name-grid">{coin.name}</p>
          </div>

          <div
            className={`watchlist-icon-grid  ${
              coin.price_change_percentage_24h < 0 && "watchlist-icon-red-grid"
            }`}
            onClick={(e) => {
              if (isCoinAdded) {
                // remove coin

                removeItemFromWatchlist(e, coin.id, setIsCoinAdded);
              } else {
                setIsCoinAdded(true);
                saveItemToWatchlist(e, coin.id);
              }
            }}
          >
            {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
          </div>
        </div>
        {coin.market_cap_change_percentage_24h > 0 ? (
          <div className="chip-flex">
            <div className="price-chip">
              {coin.market_cap_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="icon-chip">
              <TrendingUpRoundedIcon />
            </div>
          </div>
        ) : (
          <div className="chip-flex">
            <div className="price-chip chip-red">
              {coin.market_cap_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="icon-chip chip-red">
              <TrendingDownRoundedIcon />
            </div>
          </div>
        )}
        <div className="info-container">
          <h3
            className="coin-price"
            style={{
              color:
                coin.market_cap_change_percentage_24h > 0
                  ? "var(--green)"
                  : "var(--red)",
            }}
          >
            ${coin.current_price.toLocaleString()}
          </h3>
          <p className="total_volume">
            Total Volume :{coin.total_volume.toLocaleString()}
          </p>
          <p className="total_volume">
            Market Cap:${coin.market_cap.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Grid;
