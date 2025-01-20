import React, { useState, useEffect } from 'react';
import './App.css';
import { InputNumber, Select, DatePicker, Button, Form, ConfigProvider } from 'antd';
import { GetCurrenciesAsync, ConvertCurrencyAsync, GetConvertCurrencyRatesAsync,GetCurrencyRatesAsync } from './apiService';
import { ArrowRightOutlined } from '@ant-design/icons';
import useResponsive from "./useResponsive"

import "./index.css"

function CurrencyConverter(props) {


  const [output, setOutput] = useState(0);
  const [input, setInput] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState(0);
  const [targetCurrency, setTargetCurrency] = useState(0);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const { isMobile } = useResponsive();

  async function ConvertCurrency(values) {

    let response = await ConvertCurrencyAsync({
      "amount": values.inputAmount,
      "currencies": values.baseCurrency+values.targetCurrency
    });

     setOutput(response.data)
     setInput(values.inputAmount)
      setBaseCurrency(values.baseCurrency)
     setTargetCurrency(values.targetCurrency)
    props.onCurrencyChange(
      {
      "baseCurrency":values.baseCurrency,
      "targetCurrency":values.targetCurrency
      }
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

      <div className="convertCurrencyDiv"  >

        <Form onFinish={onFinish} >


          <div className="firstRowOfForm">

            <Form.Item
              name="inputAmount"
              rules={[{ required: true, message: 'Please enter an amount' }]} >
              <InputNumber className="inputNumber" min={0} defaultValue={0} size={'large'} />
            </Form.Item>

            <Form.Item
              className='selectWidth'
              name="baseCurrency"
              rules={[{ required: true, message: 'Select a currency' }]}>
              <Select
                className='selectHeight'
                showSearch
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

            {isMobile ? null :
              <div style={{ color: "rgb(239,135,51)" }}>
                <ArrowRightOutlined />
              </div>} 


            <Form.Item
              className='selectWidth'
              name="targetCurrency"
              rules={[{ required: true, message: 'Select a currency' }]}>
              <Select
                className='selectHeight'
                showSearch

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

          <div className='secondRowForm'>


            {isMobile ?
              <>
                <Form.Item>
                  <DatePicker className='datePicker' />
                </Form.Item>


                <Form.Item >
                  <Button className='button' htmlType='submit' >Convert</Button>
                </Form.Item>
                <Form.Item>

                  <div className='currencyConverterOutput'>
                    {input} {baseCurrency} = {output} {targetCurrency}
                  </div>
                </Form.Item>


              </>
              :
              <>
                <Form.Item>
                  <DatePicker className='datePicker' />
                </Form.Item>
                <Form.Item>

                  <div className='currencyConverterOutput'>
                    {input} {baseCurrency} = {output} {targetCurrency}
                  </div>
                </Form.Item>


                <Form.Item >
                  <Button className='button' htmlType='submit' >Convert</Button>
                </Form.Item>
              </>
            }




          </div>


        </Form>

      </div>
    </ConfigProvider>
  );
}

export default CurrencyConverter;
