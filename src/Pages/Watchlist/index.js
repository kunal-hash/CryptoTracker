import React, { useEffect, useState } from "react";
import { get100Coins } from "../../Functions/get100Coins";
import TabsComponent from "../../Components/TabsComponent";
import Header from "../../Components/Common/Header";



function Watchlist() {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    if (watchlist) {
      getData();
    }
  }, []);

  const getData = async () => {
    const allCoins = await get100Coins();
    if (allCoins) {
      setCoins(allCoins.filter((coin) => watchlist.includes(coin.id)));
    }
  };

  return (
    <div>
      <Header />
      {watchlist?.length > 0 ? (
        <TabsComponent coins={coins} />
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, No Items In The Watchlist.
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            {/* <a href="/dashboard">
              <Button text="Dashboard" />
            </a> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Watchlist;
