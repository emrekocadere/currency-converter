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
let int = -1;
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

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: "rgba(239, 135, 51,1)" , borderRadius: "15px", paddingInline: "10px" }}>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >

          <img className='country-flag' src={currencyImages[props.currentBaseCurrency]}/>
          
          <p style={{ marginInline: ".5vw", fontSize: "1.2em" }} >{props.currentBaseCurrency} </p>

        </div>

          <p style={{marginInline:".5vw" , fontSize:"1.2em"}} > 1</p>

      </div>
      {
        currenyRates.map((item, index) => {
          int++
          let targetCurrency = item.currencies.slice(3, 6);
          return (
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: int % 2 === 0 ?"rgba(255, 255, 255, 0.5)"  : "rgba(239, 135, 51,.8)", borderRadius: "15px", paddingInline: "10px" }} key={index}>

              <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >

                <img className='country-flag' src={currencyImages[targetCurrency]} />
                <p style={{ marginInline: ".5vw", fontSize: "1.2em",fontWeight:"300" }} > {targetCurrency} </p>
        

              </div>

              <div>
                <p style={{ fontSize: "1.2em",fontWeight:"500" }}>{item.rate}</p>
              </div>

            </div>

          )
        })
      }
    </div>

  );
}

export default CommonCurrenciesRates;