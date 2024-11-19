import React, { useState, useEffect } from 'react';
import './App.css';
import { InputNumber, Select, DatePicker, Button, Form,ConfigProvider } from 'antd';
import { GetCurrenciesAsync, ConvertCurrencyAsync,GetConvertCurrencyRatesAsync } from './apiService';





function CurrencyConverter(props) {

  const [output, setOutput] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  
  let fromCurrency,toCurrency;


  async function ConvertCurrency(values) {
    toCurrency=values.inputCurrency;
    fromCurrency=values.outputCurrency;
    let response = await ConvertCurrencyAsync({
      "amount": values.inputAmount,
      "fromCurrency": values.inputCurrency,
      "toCurrency": values.outputCurrency
    });
    setOutput(response.data.result)
    GetConvertCurrencyRates({
      "FromCurrency": values.inputCurrency,
      "ToCurrency": values.outputCurrency
    });
  }

  
  async function GetConvertCurrencyRates(values) {
    let response = await GetConvertCurrencyRatesAsync(values)
    
    props.sendCurrencyData(
  response.rates

    )
  }

  async function GetCurrencies() {
    let response = await GetCurrenciesAsync()
    setCurrencies(response)
  }



  useEffect(() => {
    GetCurrencies()
  }, [])



  const onFinish = (values) => {


    ConvertCurrency(values)

  };


  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: 'rgb(239,135,51)' // 
      }
    }}
  >
    <div className="App" style={{ background: "rgb(246, 246, 246)", width: "40vw", borderRadius: "25px", boxShadow: "0px 0px 15px 7px rgb(222, 222, 222)", justifyContent: "space-between", padding: "3vh 3vw" }}>

      {/* <DatePicker style={{ width: '200px', height: '40px' }} /> */}

      <Form style={{ display: "flex", flexDirection: "row" }} onFinish={onFinish}>

        <div style={{ display: "flex", flexDirection: "column" }}>

          <Form.Item
            name="inputAmount" >
            <InputNumber min={0} defaultValue={3} size={'large'} style={{ marginBottom: "20px", width: "15vw", height: "5vh" }} />
          </Form.Item>
          <Form.Item name="inputCurrency">
            <Select
              showSearch
              style={{ width: "15vw", height: "5vh" }}
              placeholder="Select a person"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={
                currencies.map((currency) => ({
                  value: currency.code,  // Örneğin: 'USD'
                  label: currency.code   // Örneğin: 'US Dollar'
                }))
              }
            />
          </Form.Item>
        </div>

        <div style={{ padding: "3vw" }}>
          <Form.Item>
            <Button htmlType='submit' >emre</Button>
          </Form.Item>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <Form.Item name="outputAmount" >
            <InputNumber min={0} defaultValue={3} value={output} size={'large'} style={{ marginBottom: "20px", width: "15vw", height: "5vh" }} />
          </Form.Item>
          <Form.Item name="outputCurrency">
            <Select
              showSearch
              style={{ width: "15vw", height: "5vh" }}
              placeholder="Select a person"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={
                currencies.map((currency) => ({
                  value: currency.code, 
                  label: currency.code   
                }))
              }
            />
          </Form.Item>
          <InputNumber min={0} defaultValue={3} value={output} size={'large'} style={{ marginBottom: "20px", width: "15vw", height: "5vh" }} />
        </div>
      </Form>





    </div>
      </ConfigProvider>
  );
}

export default CurrencyConverter;
