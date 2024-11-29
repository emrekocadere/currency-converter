import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";

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



useEffect(()=>{convertRatesToData() },[props.currencyRates])

  return (
    <div style={{}}>
      <Chart
        chartType="LineChart"
        width="30vw"
        height="40vh"
        data={data}
        options={options}
      />
    </div>

  );
}

export default GoogleLineChart;