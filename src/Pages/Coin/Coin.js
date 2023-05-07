import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Common/Loader";
import Header from "../../Components/Common/Header";
import { CoinObject } from "../../Functions/convertObject";
import List from "../../Components/List";
import CoinInfo from "./CoinInfo";
import { getCoinData } from "../../Functions/getCoinData";
import { getCoinPrices } from "../../Functions/getCoinPrices";
import Linechart from "../LineChart";
import { convertDate } from "../../Functions/convertDate";
import SelectDays from "./SelectDays";
import { SettingChartData } from "../../Functions/settingChartData";
import TogglePriceType from "./PriceType";

function CoinPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [coindata, setCoinData] = useState();
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState({});
  const [priceType, setPriceType] = useState("prices");

  useEffect(() => {
    if (id) {
      console.log("ID >>>", id);
      getData();
    }
  }, [id]);

  // const handlePriceTypeChange = async (newType) => {
  //   setPriceType(newType);
  //   setIsLoading(true);
  //   console.log("newType", newType);
  //   const prices = await getCoinPrices(id, days, priceType);
  //   if (prices.length > 0) {
  //     console.log("Prices", prices);
  //     console.log("success");
  //     SettingChartData(setChartData, prices);
  //     console.log("chartdata", chartData);
  //     setIsLoading(false);
  //   }
  // };


  const handlePriceTypeChange = async (event, newType) => {
    setPriceType(newType);
    
    setIsLoading(true);
    const prices = await getCoinPrices(id, days, newType);
    if (prices.length > 0) {
      
      SettingChartData(setChartData, prices, priceType);
      
      setIsLoading(false);
    }
  };

  async function getData() {
    const data = await getCoinData(id);
    if (data) {
      CoinObject(setCoinData, data);
      const prices = await getCoinPrices(id, days,priceType);
      if (prices) {
       
        SettingChartData(setChartData, prices);
        console.log("harami", prices);
        setIsLoading(false);
      }
    }
  };


  const handleDaysChange = async (event) => {
    setIsLoading(true);
    setDays(event.target.value);
    const prices = await getCoinPrices(id, event.target.value, priceType);
    if (prices.length > 0) {
      console.log("success");
      SettingChartData(setChartData, prices);
      console.log("chartdata", chartData);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header></Header>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <div className="grey-wrapper">
            <List coin={coindata}></List>
          </div>

          <div className="grey-wrapper">
            <SelectDays
              days={days}
              handleDaysChange={handleDaysChange}
            ></SelectDays>
            <TogglePriceType
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <Linechart chartData={chartData}></Linechart>
          </div>

          <CoinInfo heading={coindata.name} desc={coindata.desc}></CoinInfo>
        </>
      )}
    </div>
  )
}

export default CoinPage;
