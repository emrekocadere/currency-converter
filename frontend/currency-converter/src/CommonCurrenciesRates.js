import React, { useState, useEffect } from 'react';
import { GetCurrencyRatesAsync } from "./apiService"
import { Divider, Typography } from 'antd';
// import Flag_of_European_Union from "./Images/Euro.svg"
import Usd from "./Images/us.svg"
import Eur from "./Images/eu.svg"
import Jpy from "./Images/jp.svg"
import Gbp from "./Images/gb.svg"
import Aud from "./Images/au.svg"
import Cad from "./Images/ca.svg"
import Chf from "./Images/ch.svg"

const { Title, Paragraph, Text, Link } = Typography;

const currencyImages = {
  USD: Usd,
  EUR: Eur,
  CAD: Cad,
  AUD: Aud,
  CHF: Chf,
  JPY: Jpy,
  GBP: Gbp

};


function CommonCurrenciesRates(props) {

  const [currencyGraph, setCurrencyGraph] = useState("HomePage");
  const [currenyRates, setCurrenyRates] = useState([]);



  async function GetCommonCurrenciesRates() {
    let response = await GetCurrencyRatesAsync(props.currentBaseCurrency)
    //  console.log(response.data)
    setCurrenyRates(response.data)
  }


  useEffect(() => {
    GetCommonCurrenciesRates()
  }, [props.currentBaseCurrency])


  return (
    <div style={{
      borderRadius: "10px", borderWidth: ".1vw", borderStyle: "solid", borderColor: "rgb(239,135,51)", padding: "1.5vh", marginInline: "10px", display: "flex",
      flexDirection: "column"
    }}>
      {
        currenyRates.map((item, index) => {
          {/* //slice is used to get the first 3 characters of the currency */ }
          let baseCurrency = item.currencies.slice(0, 3);
          let targetCurrency = item.currencies.slice(3, 6);
          return (
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

              <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
               
                  <img src={currencyImages[baseCurrency]} style={{ width: "1.5vw",borderRadius:"15%" }} />
                  <p style={{marginInline:".5vw"}}> {baseCurrency} / {targetCurrency} </p>
                  <img src={currencyImages[targetCurrency]} style={{ width: "1.5vw",borderRadius:"15%" }} />
    
              </div>

              <div>
                <p>{item.rate}</p>
              </div>

            </div>

          )
        })
      }
    </div>

  );
}

export default CommonCurrenciesRates;