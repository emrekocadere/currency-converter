import React, { useState, useEffect } from 'react';
import { GetCurrencyRatesAsync } from "./apiService"
import { Divider, Typography } from 'antd';
// import Flag_of_European_Union from "./Images/Euro.svg"
import USD from "./Images/usa.svg"
import Eu from "./Images/Eu.svg"
import Japan from "./Images/Japan.svg"
import Uk from "./Images/Uk.svg"

const { Title, Paragraph, Text, Link } = Typography;


function CommonCurrenciesRates(props) {

  const [currencyGraph, setCurrencyGraph] = useState("HomePage");
  const [currenyRates, setCurrenyRates] = useState([]);



  async function GetCommonCurrenciesRates() {
    let response = await GetCurrencyRatesAsync(props.currentCurrency)
    //  console.log(response.data)
    setCurrenyRates(response.data)
  }


  useEffect(() => {
    GetCommonCurrenciesRates()
  }, [props.currentCurrency])


  return (
    <div style={{
      borderRadius: "10px", borderWidth: ".1vw", borderStyle: "solid", borderColor: "rgb(239,135,51)", padding: "1.5vh", marginInline: "10px", display: "flex",
      flexDirection: "column"
    }}>
      {
        currenyRates.map((item, index) => {
         {/* //slice is used to get the first 3 characters of the currency */}
          let baseCurrency = item.currencies.slice(0,3);
          let targetCurrency = item.currencies.slice(3,6);
          return (
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

              <div> <p>  <img src={baseCurrency} style={{width:"25px"}}></img> {baseCurrency} / {targetCurrency}</p></div> 
              <div> <p>{item.rate}</p></div>
            </div>

          )
        })
      }
    </div>

  );
}

export default CommonCurrenciesRates;