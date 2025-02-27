import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";

import { LineChart } from '@mui/x-charts/LineChart';

import "./index.css"
import { GetCurrencyRatesLastThreeMonthsAsync } from './apiService';
import useResponsive from "./useResponsive"

const datas = [
  []
];

const options = {
  // hAxis: { title: "Date" },
  // vAxis: { title: "Worth" },
  legend: "none",
  colors: ["rgb(239,135,51)"]
};

function GoogleLineChart(props) {
  const { isMobile } = useResponsive();
  const [data, setData] = useState([]);
  const [times, setTimes] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [yPadding, setYPadding] = useState(0);


  function ConvertData(currencyRatesForThreeMonths) {
    // let newData = currencyRatesForThreeMonths.map(rate => rate.rate);
    // let timestamps = currencyRatesForThreeMonths.map(rate => rate.timestamp);


    let newData = currencyRatesForThreeMonths.map(rate => Number(rate.rate) || 0);
    let timestamps = currencyRatesForThreeMonths.map(rate => new Date(rate.timestamp).getTime());
 
    setData(newData);
    setTimes(timestamps);

    let min = Math.min(...newData);
    let max = Math.max(...newData);
    let padding = (max - min) * 0.1; // %10 ekleme

    setMinValue(min);
    setMaxValue(max);
    setYPadding(padding);


  }


  async function GetCurrencyRatesLastThreeMonths() {
    const request = props.currentBaseCurrency + props.currentTargetCurrency
    let response = await GetCurrencyRatesLastThreeMonthsAsync(request)
    ConvertData(response.data)
  }

  useEffect(() => {
    GetCurrencyRatesLastThreeMonths();
  }, [props.currentTargetCurrency, props.currentBaseCurrency]);

  return (
    <div className='chart' style={{  }}>


      <LineChart
        // xAxis={[{ data: times,label:"date" }]}
        xAxis={[{ data: times.map(time => new Date(time)), scaleType: "time", label: "Date" }]}
        yAxis={[{ min: minValue - yPadding, max: maxValue + yPadding }]}
        series={[
          {
            data: data,
            label: props.currentTargetCurrency,
            showMark: false,
          },
        ]}
   
        height={300}
        colors={['rgb(239,135,51)']}
      />
    </div>

  );
}

export default GoogleLineChart;