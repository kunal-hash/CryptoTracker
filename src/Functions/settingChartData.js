import { convertDate } from "./convertDate";

export const SettingChartData = (setChartData, prices1, prices2, crypto1, crypto2) => {

  console.log("crypto1>>", crypto1);
  console.log("crypto2>>", crypto2);

  console.log("prices1>>", prices1);
  console.log("prices2>>", prices2);
  
  if (prices2) {
    setChartData({
      labels: prices1.map((price) => convertDate(price[0])),
      datasets: [
        {
          label: "crypto1",
          data: prices1.map((price) => price[1]),
          borderColor: "#3a80e9",
          borderWidth: 2,
          fill: false,
          tension: 0.25,
          borderColor: "#3a80e9",
          pointRadius: 0,
          yAxisID: "crypto1",
        },
        {
          label: "crypto2",
          data: prices2.map((price) => price[1]),
          borderColor: "#3a80e9",
          borderWidth: 2,
          fill: false,
          tension: 0.25,
          borderColor: "#61c96f",
          pointRadius: 0,
          yAxisID: "crypto2",
        },
      ],
    });
  } else {
    setChartData({
      labels: prices1.map((price) => convertDate(price[0])),
      datasets: [
        {
          label:crypto1.id,
          data: prices1.map((price) => price[1]),
          borderColor: "#3a80e9",
          borderWidth: 2,
          fill: true,
          tension: 0.25,
          backgroundColor: "rgba(58,128,233,0.1)",
          borderColor: "#3a80e9",
          pointRadius: 0,
          yAxisID: crypto1,
        },
      ],
    });
  }
};
