import React, { useEffect, useState } from "react";
import Header from "../../Components/Common/Header";
import SelectCoins from "../../Components/Compare/SelectCoins";
import SelectDays from "../Coin/SelectDays";
import { CoinObject } from "../../Functions/convertObject";
import { getCoinPrices } from "../../Functions/getCoinPrices";
import { getCoinData } from "../../Functions/getCoinData";
import Loader from "../../Components/Common/Loader";
import List from "../../Components/List";
import CoinInfo from "../Coin/CoinInfo";
import "./styles.css";
import { SettingChartData } from "../../Functions/settingChartData";
import Linechart from "../LineChart";
import TogglePriceType from "../Coin/PriceType";
 



function Compare() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [days, setDays] = useState(30);
  const [isLoading, setIsLoading] = useState(true);
  const [priceType, setPriceType] = useState("prices");
  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setIsLoading(true);
    const data1 = await getCoinData(crypto1);
    const data2 = await getCoinData(crypto2);
    if (data1) {
      CoinObject(setCrypto1Data, data1);
    }
    if (data2) {
      CoinObject(setCrypto2Data, data2);
    }

    if (data1 && data2) {
      const prices1 = await getCoinPrices(crypto1, days, priceType);
      const prices2 = await getCoinPrices(crypto2, days, priceType);
      if (prices1 && prices2) {
       
        SettingChartData(setChartData, prices1, prices2, crypto1, crypto2);
        setIsLoading(false);
      }
    }


    // setIsLoading(true);
    // const data1 = await getCoinData(crypto1);
    // if (data1) {
    //   console.log("data1 >>>>", data1);
    //   const data2 = await getCoinData(crypto2);
    //   CoinObject(setCrypto1Data, data1);
    //   if (data2) {
    //     console.log("data2>>>", data2);
    //     CoinObject(setCrypto2Data, data2);
    //     const prices1 = await getCoinPrices(crypto1, days, priceType);
    //     const prices2 = await getCoinPrices(crypto2, days, priceType);
    //     SettingChartData(setChartData, prices1, prices2,crypto1,crypto2);

    //      console.log(
    //       "Both prices are fetched Initial Render >>>",
    //       prices1,
    //       prices2
    //     );
    //     setIsLoading(false);
    //   }
    // }

  }

  const handlePriceTypeChange = async (event, newType) => {
   setIsLoading(true);
   setPriceType(newType)
   const prices1 = await getCoinPrices(crypto1, days, newType);
   const prices2 = await getCoinPrices(crypto2, days, newType);
   SettingChartData(setChartData, prices1, prices2,crypto1,crypto2);
   setIsLoading(false);
  };

  async function handleDaysChange(event) {
    setIsLoading(true);
    setDays(event.target.value);
    const prices1 = await getCoinPrices(crypto1, event.target.value, priceType);
    const prices2 = await getCoinPrices(crypto2, event.target.value, priceType);
    SettingChartData(setChartData, prices1, prices2,crypto1,crypto2);
    setIsLoading(false);
  }

  // const handlePriceTypeChange = async (event, newType) => {
  //   setPriceType(newType);
  //   console.log("newtype", newType);
  //   console.log("NewType >>>", newType);
  //   setIsLoading(true);
  //   const prices = await getCoinPrices(id, days, newType);
  //   if (prices.length > 0) {
  //     console.log("successhandlepricechange", prices);
  //     SettingChartData(setChartData, prices, priceType);
  //     console.log("chartdatahandlepricetype", chartData);
  //     setIsLoading(false);
  //   }
  // };

  const handleCoinChange = async (event, isCoin2) => {
    setIsLoading(true);
    if (isCoin2) {
      setCrypto2(event.target.value);
      const data = await getCoinData(event.target.value);
      CoinObject(setCrypto2Data, data);

      const prices1 = await getCoinPrices(crypto1, days, priceType);
      const prices2 = await getCoinPrices(event.target.value, days, priceType);

      if (prices1 && prices2) {
        console.log("Both prices are fetched", prices1, prices2);
        SettingChartData(setChartData, prices1, prices2, crypto1, crypto2);
        setIsLoading(false);
      }
    } else {
      setCrypto1(event.target.value);
      const data = await getCoinData(event.target.value);
      CoinObject(setCrypto1Data, data);
       const prices1 = await getCoinPrices(event.target.value, days, priceType);
       const prices2 = await getCoinPrices(crypto2, days, priceType);

       if (prices1 && prices2) {
         console.log("Both prices are fetched", prices1, prices2);
         SettingChartData(setChartData, prices1, prices2, crypto1, crypto2);
         setIsLoading(false);
       }
    }
  };

  

 



  return (
    <div>
      <Header></Header>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <div className="coins-days-flex">
            <SelectCoins
              crypto1={crypto1}
              crypto2={crypto2}
              handleCoinChange={handleCoinChange}
            ></SelectCoins>
            <SelectDays
              noPTag={true}
              days={days}
              handleDaysChange={handleDaysChange}
            ></SelectDays>
          </div>
          <div className="grey-wrapper">
            <List coin={crypto1Data}></List>
          </div>
          <div className="grey-wrapper">
            <List coin={crypto2Data}></List>
          </div>
          <div className="grey-wrapper toggle-price-type">
            <TogglePriceType
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <Linechart
              chartData={chartData}
              priceType={priceType}
              multiAxis={true}
            ></Linechart>
          </div>
          <div>
            <CoinInfo
              heading={crypto1Data.name} //prop name should be used the same in the main component
              desc={crypto1Data.desc}
            ></CoinInfo>
          </div>
          <div>
            <CoinInfo
              heading={crypto2Data.name} //prop name should be used same in the main component
              desc={crypto2Data.desc}
            ></CoinInfo>
          </div>
        </>
      )}
    </div>
  );
}

export default Compare;
