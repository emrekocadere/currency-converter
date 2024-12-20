import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import "./index.css"
const datas = [
  ["x", "dogs"],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];

const options = {
  hAxis: { title: "Date" },
  vAxis: { title: "Worth" },
  legend:"none",
  colors: ["rgb(239,135,51)"] 
};

function GoogleLineChart(props) {

  const [data, setData] = useState(datas);

  function convertRatesToData() {
   console.log(props)
    const dates = Object.keys(props.currencyRates);
   let currency = Object.keys(props.currencyRates[dates[0]])[0]; 
    const newData = [["y", currency]]; 
   

    dates.forEach((date, index) => {
     // const currency=Object.keys(props.currencyRates[date])[0];
      const value = props.currencyRates[date][currency];
      newData.push([date, value]);
    });

   // console.log(newData);  // Log the new data
    setData(newData);  // Update the state with the new data
    console.log(data)
  }


useEffect(()=>{convertRatesToData() },[props.currencyRates])

  return (
    <div className='googleChart'>
      <Chart
        chartType="LineChart"
        width="105%"
         height="40vh"
        data={data}
        options={options}
      />
    </div>

  );
}

export default GoogleLineChart;