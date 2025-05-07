import React, { useState, useEffect } from 'react';
import { getRatesForCurrency } from "./apiService"
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
    let response = await getRatesForCurrency(props.currentBaseCurrency)
    //  console.log(response.data)
    setCurrenyRates(response.data)
  }


  useEffect(() => {
    GetCommonCurrenciesRates()
  }, [props.currentBaseCurrency])


  return (
    <div className='common-currencies-rates'>
      {  
        currenyRates.map((item, index) => {
          let baseCurrency = item.currencies.slice(0, 3);
          let targetCurrency = item.currencies.slice(3, 6);
          return (
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

              <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
               
                  <img className='countryFlag' src={currencyImages[baseCurrency]} />
                  <p style={{marginInline:".5vw" , fontWeight:"500"}}> {baseCurrency} / {targetCurrency} </p>
                  <img className='countryFlag' src={currencyImages[targetCurrency]} />
    
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