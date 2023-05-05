import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, ChartJS } from "chart.js/auto";
import "./styles.css";
import { convertNumber } from "../../Functions/convertNumbers";

function Linechart({ chartData, priceType, multiAxis }) {
  const options = {
    Plugins: {
      legend: {
        display: multiAxis ? true : false,
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      crypto1: {
        type: "linear",
        display: true,
        position: "left",
        ticks: {
          callback: function (value, index, ticks) {
            if (priceType == "prices") return "$" + value.toLocaleString();
            else {
              return "$" + convertNumber(value);
            }
          },
        },
      },
      crypto2: {
        type: "linear",
        display: true,
        position: "right",
        ticks: {
          callback: function (value, index, ticks) {
            if (priceType == "prices") return "$" + value.toLocaleString();
            else {
              return "$" + convertNumber(value);
            }
          },
        },
      },
    },
  };
  return <Line data={chartData} options={options} />;
}

export default Linechart;
