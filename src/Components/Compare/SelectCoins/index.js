import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import React, { useState, useEffect } from "react";
import "./styles.css";

import axios from "axios";
function SelectCoins({ crypto1, crypto2, handleCoinChange }) {
  const [allCoins, setAllCoins] = useState([]);
  // const handleCoin1Change = (event) => {
  //   setCrypto1(event.target.value);
  //   console.log(event.target.value);
  // };
  // const handleCoin2Change = (event) => {
  //   setCrypto2(event.target.value);
  //   console.log(event.target.value);
  // };
  const style = {
    height: "2.5rem",
    color: "var(--white)!important",
    "&.MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--white)!important",
    },
    "& .MuiSvgIcon-root": {
      color: "var(--white)",
    },
    "&:hover": {
      "&& fieldset": {
        borderColor: "#3a80e9",
      },
    },
    "&": {
      "&& fieldset": {
        borderColor: "var(--white)",
      },
    },
  };

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
      )
      .then((response) => {
        console.log(response.data);
        setAllCoins(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <div className="coin-flex">
      <p>Crypto1</p>
      <Select
        sx={style}
        value={crypto1}
        label="Crypto 1"
        onChange={(event) => handleCoinChange(event, false)}
      >
        {allCoins.filter((item)=>item.id!=crypto2).map((coin) => (
          <MenuItem value={coin.id}>{coin.name}</MenuItem>
        ))}
      </Select>
      <p>Crypto2</p>
      <Select
        sx={style}
        value={crypto2}
        label="Crypto 2"
        onChange={(event) => handleCoinChange(event, true)}
      >
        {allCoins.filter((item)=>item.id!=crypto1).map((coin,i) => (
          <MenuItem key={i} value={coin.id}>
            {coin.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default SelectCoins;
