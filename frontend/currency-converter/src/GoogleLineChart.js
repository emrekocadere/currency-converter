import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";

// const data = [
//   ["x", "dogs"],
//   [0, 0],
//   [1, 10],
//   [2, 23],
//   [3, 17],
//   [4, 18],
//   [5, 9],
//   [6, 11],
//   [7, 27],
//   [8, 33],
//   [9, 40],
//   [10, 32],
//   [11, 35],
// ];



const options = {
  hAxis: { title: "Time" },
  vAxis: { title: "Popularity" },
  legend: "none",
};

function GoogleLineChart(props) {

  
  const [data, setData] = useState(["x", "EUR"]);

  function convertRatesToData() {
   
    const dates = Object.keys(props.currencyRates);
   let currency = Object.keys(props.currencyRates[dates[0]])[0]; 
    const newData = [["x", currency]]; 
   

    dates.forEach((date, index) => {
     // const currency=Object.keys(props.currencyRates[date])[0];
      const value = props.currencyRates[date][currency];
      newData.push([date, value]);
    });

    console.log(newData);  // Log the new data
    setData(newData);  // Update the state with the new data
  }

useEffect(()=>{console.log(props.currencyRates); convertRatesToData();},[props.currencyRates])

  return (
    <div style={{}}>
      <Chart
        chartType="LineChart"
        width="100%"
        height="40vh"
        data={data}
        options={options}
      />
    </div>

  );
}

export default GoogleLineChart;