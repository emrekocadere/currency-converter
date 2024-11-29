import React, { useState, useEffect } from 'react';
import './App.css';
import { InputNumber, Select, DatePicker, Button, Form, ConfigProvider } from 'antd';
import { GetCurrenciesAsync, ConvertCurrencyAsync, GetConvertCurrencyRatesAsync } from './apiService';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Color } from 'antd/es/color-picker';




function CurrencyConverter(props) {

  const [output, setOutput] = useState(0);
  const [input, setInput] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState(0);
  const [targetCurrency, setTargetCurrency] = useState(0);
  const [currencyOptions, setCurrencyOptions] = useState([]);




  async function ConvertCurrency(values) {

    let response = await ConvertCurrencyAsync({
      "amount": values.inputAmount,
      "fromCurrency": values.baseCurrency,
      "toCurrency": values.targetCurrency
    });
    setOutput(response.data.result)
    setInput(values.inputAmount)
    setBaseCurrency(values.baseCurrency)
    setTargetCurrency(values.targetCurrency)
    GetConvertCurrencyRates({
      "FromCurrency": values.baseCurrency,
      "ToCurrency": values.targetCurrency
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
    setCurrencyOptions(response)
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
      <div className="App" style={{ background: "rgb(246, 246, 246)", borderRadius: "25px", boxShadow: "0px 0px 15px 7px rgb(222, 222, 222)", padding: "3vh 1vw" }}>


        <Form style={{ display: "flex", flexDirection: "column" }} onFinish={onFinish}>

          <div style={{ display: "flex", flexDirection: "row", justifyContent:"space-between",alignItems:"baseline" }}>

            <Form.Item
              name="inputAmount" >
              <InputNumber min={0} defaultValue={3} size={'large'} style={{ width: "10vw", height: "5vh" }} />
            </Form.Item>

            <Form.Item name="baseCurrency">
              <Select
                showSearch
                style={{ width: "10vw", height: "5vh"}}
                placeholder="Select Base Currency"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={
                  currencyOptions.map((currency) => ({
                    value: currency.code,
                    label: currency.code
                  }))
                }
              />
            </Form.Item>

            <div style={{ color: "rgb(239,135,51)" }}>
              <ArrowRightOutlined />
            </div>

            <Form.Item name="targetCurrency">
              <Select
                showSearch
                style={{ width: "10vw", height: "5vh" }}
                placeholder="Select Base Currency"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={
                  currencyOptions.map((currency) => ({
                    value: currency.code,
                    label: currency.code
                  }))
                }
              />
            </Form.Item>

          </div>

          <div style={{ display: "flex", flexDirection: "row",justifyContent:"space-between" }}>


            <DatePicker style={{ width: "10vw", height: "5vh" }} />
             <div style={{background:"white",borderColor:"rgb(239,135,51)",borderRadius:"10px",borderWidth:".1vw",borderStyle:"solid",width:"15vw",height:"5vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
               {input} {baseCurrency} = {output} {targetCurrency}
              </div> 

            <Form.Item >
              <Button style={{ width: "10vw", height: "5vh" }} htmlType='submit' >Convert</Button>
            </Form.Item>

          </div>
          {/* <InputNumber min={0} defaultValue={3} value={output} size={'large'} style={{ marginBottom: "20px", width: "15vw", height: "5vh" }} /> */}


        </Form>

      </div>
    </ConfigProvider>
  );
}

export default CurrencyConverter;
