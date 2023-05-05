import React from "react";
import Header from "../../Components/Common/Header";
import TabsComponent from "../../Components/TabsComponent";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loader from "../../Components/Common/Loader";
import Search from "../../Components/Search";
import { get100Coins } from "../../Functions/get100Coins";
import PaginationControlled from "./Pagination";
import BackToTop from "../../Components/Common/BackToTop";


function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [paginatedCoins, setPaginatedCoins] = useState([]);

  var filteredCoins = coins.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const onSearchChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const myCoins = await get100Coins();
    if (myCoins) {
      setCoins(myCoins);
      setPaginatedCoins(myCoins.slice(0, 10));
      setIsLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    // Value = new page number
    var initialCount = (value - 1) * 10;
    setPaginatedCoins(coins.slice(initialCount, initialCount + 10));
  };
  return (
    <>
      <Header></Header>
      <BackToTop></BackToTop>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Search search={search} onSearchChange={onSearchChange}></Search>
          <TabsComponent
            coins={search ? filteredCoins : paginatedCoins}
          ></TabsComponent>
            {
              !search && (
            <PaginationControlled
              page={page}
              handlePageChange={handlePageChange}
            ></PaginationControlled>
              )
            }
        </div>
      )}
    </>
  );
}

export default Dashboard;
