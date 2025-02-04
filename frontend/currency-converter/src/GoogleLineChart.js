import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import "./index.css"
import { GetCurrencyRatesLastThreeMonthsAsync } from './apiService';
import useResponsive from "./useResponsive"

const datas = [
  ["x", "sd"],
  [0, 0],
  [1, 10],
  [2, 23],
  [3, 17],
  [4, 18],
  [5, 9],
  [6, 11],
  [7, 27],
  [8, 33],
  [9, 40],
  [10, 32],
  [11, 35],
  [0, 0],
  [0, 0],
  [0, 0],
  [2, 0],
  [0, 3],
];

const options = {
  // hAxis: { title: "Date" },
  // vAxis: { title: "Worth" },
  legend: "none",
  colors: ["rgb(239,135,51)"]
};

function GoogleLineChart(props) {
  const { isMobile } = useResponsive();
  const [data, setData] = useState(datas);
  function ConvertData(currencyRatesForThreeMonths) {
    const newData = [["xdsf", currencyRatesForThreeMonths[0].currencies.slice(3, 6)]];
    currencyRatesForThreeMonths.forEach((rate, index) => {
      newData.push([rate.timestamp, rate.rate]);
    });
    setData(newData);
  }
  async function GetCurrencyRatesLastThreeMonths() {
    const request=props.currentBaseCurrency+props.currentTargetCurrency
    let response = await GetCurrencyRatesLastThreeMonthsAsync(request)
    ConvertData(response.data)
  }
  useEffect(() => {
    GetCurrencyRatesLastThreeMonths();
  }, [props.currentTargetCurrency , props.currentBaseCurrency]);

  return (
    <div className='googleChart'>
      <Chart
        chartType="LineChart"
         width="100%"
        height={isMobile ? "28vh" : "32vh"}
        data={data}
        options={options}
      />
    </div>

  );
}

export default GoogleLineChart;