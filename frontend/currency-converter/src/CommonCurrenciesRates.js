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

function CommonCurrenciesRates() {

  

  return (
    <div style={{borderRadius:"10px",borderWidth:".1vw",borderStyle:"solid",borderColor:"rgb(239,135,51)",padding:"1.5vh",marginInline:"10px"}}>
   EURO/USD
    </div>

  );
}

export default CommonCurrenciesRates;