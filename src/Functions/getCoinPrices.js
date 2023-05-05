import axios from "axios";
export const getCoinPrices = (id, days, priceType) => {
  const prices = axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
    )
    .then((response) => {
      console.log("PriceType", priceType);
      console.log("MarketChart >>>", response.data);
      console.log(
        "MarketChart(PricesArray(P,MC,TV)) >>>",
        response.data[priceType]
      );
      // console.log("MarketChart(Market Caps) >>>", response.data.market_caps);
      // console.log(
      //   "MarketChart(Total Volumes) >>>",
      //   response.data.total_volumes
      // );

      return response.data[priceType];
    })
    .catch((error) => {
      console.log("Error(MarketChart)", error);
    });

  return prices;
};
