import React, { useEffect, useState } from "react";
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUp";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDown";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { saveItemToWatchlist } from "../../Functions/saveItemToWatchlist";
import { removeItemFromWatchlist } from "../../Functions/removeItemFromWatchlist";
import { convertNumber } from "../../Functions/convertNumbers";





function List({ coin }) {
   const watchlist = JSON.parse(localStorage.getItem("watchlist"));
   const [isCoinAdded, setIsCoinAdded] = useState(watchlist?.includes(coin.id));
  
  console.log("Coin-id", coin);
  return (
    <table className="list-table">
      <Link to={`/coin/${coin.id}`}>
        <tr className="list-row">
          <td className="info-flex-list ">
            <Tooltip title="logo" placement="bottom-end">
              <img className="coin-logo coin-logo-td" src={coin.image}></img>
            </Tooltip>
          </td>

          <td className="name-column name-column-td td-info ">
            <Tooltip title="Symbol" placement="bottom-end">
              <p className="coin-symbol-list font-small">{coin.symbol}</p>
            </Tooltip>
            <Tooltip title="Name" placement="bottom-end">
              <p className="coin-name-list font-small">{coin.name}</p>
            </Tooltip>
          </td>

          {coin.market_cap_change_percentage_24h > 0 ? (
            <Tooltip title="Price Change" placement="bottom-end">
              <td className="chip-flex">
                <div className="price-chip price-chip-list chip-green">
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div className="icon-chip">
                  <TrendingUpRoundedIcon />
                </div>
              </td>
            </Tooltip>
          ) : (
            <Tooltip title="Price Change" placement="bottom-end">
              <td className="chip-flex">
                <div className="price-chip chip-red">
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div className="icon-chip chip-red">
                  <TrendingDownRoundedIcon />
                </div>
              </td>
            </Tooltip>
          )}
          <Tooltip title="Current Price" placement="bottom-end">
            <td className="coin-price-td">
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
            </td>
          </Tooltip>

          <Tooltip title="Total Volume" placement="bottom-end">
            <td className="total-volume-hide">
              <p className="total_volume total-volume-td">
                {coin.total_volume.toLocaleString()}
              </p>
            </td>
          </Tooltip>
          <Tooltip title="Market Cap" placement="bottom-end">
            <td className="market-cap-hide">
              <p className="total_volume market-cap-td">
                ${coin.market_cap.toLocaleString()}
              </p>
            </td>
          </Tooltip>
          <Tooltip title="Market Cap">
            <td className="coin-name-mobile market-cap-responsive">
              ${convertNumber(coin.market_cap)}
            </td>
          </Tooltip>
        </tr>
      </Link>
    </table>
  );
}

export default List;
