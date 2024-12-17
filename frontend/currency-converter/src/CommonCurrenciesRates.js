import React, { useState, useEffect } from 'react';
import { GetCommonCurrenciesRatesAsync } from "./apiService"
import { Divider, Typography } from 'antd';
// import Flag_of_European_Union from "./Images/Euro.svg"
// import usd from  "./Images/Euro.svg"

const { Title, Paragraph, Text, Link } = Typography;


function CommonCurrenciesRates() {

  const [currencyGraph, setCurrencyGraph] = useState("HomePage");



  async function GetCommonCurrenciesRates() {
    let response = await GetCommonCurrenciesRatesAsync()
    console.log(response)
  }


  useEffect(() => {
    // GetCommonCurrenciesRates()
  }, [])


  return (
    <div style={{
      borderRadius: "10px", borderWidth: ".1vw", borderStyle: "solid", borderColor: "rgb(239,135,51)", padding: "1.5vh", marginInline: "10px", display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* <img src={Flag_of_European_Union} style={{ width: "2.5vw", marginRight: ".5vw" }} alt="My Icon" />
        <Text strong style={{ fontSize: "125%" }}>  EUR / JYP </Text>
        <img src={usd} style={{ width: "3vw", paddingLeft: ".5vw" }} alt="My Icon" />
        <Text strong style={{ fontSize: "125%" }}> = </Text> */}
      </div>

    </div>

  );
}

export default CommonCurrenciesRates;