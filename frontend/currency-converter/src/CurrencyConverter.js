import React, { useState, useEffect } from 'react';
import './App.css';
import { InputNumber, Select, DatePicker, Button, Form, ConfigProvider } from 'antd';
import { getCurrencies, convertCurrency, GetConvertCurrencyRatesAsync,  convertCurrencyOnDate } from './apiService';
import { ArrowRightOutlined } from '@ant-design/icons';
import useResponsive from "./useResponsive"

import "./index.css"
const { Option } = Select;
function CurrencyConverter(props) {

  const [output, setOutput] = useState(0);
  const [input, setInput] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState(0);
  const [targetCurrency, setTargetCurrency] = useState(0);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const { isMobile } = useResponsive();
  const selectAfter = (
  <Select defaultValue="USD" style={{ width: 60 }}>
    <Option value="USD">$</Option>
    <Option value="EUR">€</Option>
    <Option value="GBP">£</Option>
    <Option value="CNY">¥</Option>
  </Select>
);


  async function ConvertCurrency(values) {

    let response = await convertCurrency(values.inputAmount,values.baseCurrency + values.targetCurrency);
    setOutput(response.data.data)
  }



  async function ConvertCurrencyForSpecificDate(values) {
    const date = values.datePicker.$d
    const year = date.getFullYear(); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0'); 

    const formatedDate = `${year}-${month}-${day}`;

    let responseBody={
      date:formatedDate,
      currencies:values.baseCurrency+values.targetCurrency,
      amount:values.inputAmount
    }
    let response = await convertCurrencyOnDate(responseBody)
    setOutput(response.data)
  }

  async function GetCurrencies() {
    let response = await getCurrencies()
    setCurrencyOptions(response)
  }

  useEffect(() => {
    GetCurrencies()

  }, [])

  const onFinish = (values) => {
    setInput(values.inputAmount)
    setBaseCurrency(values.baseCurrency)
    setTargetCurrency(values.targetCurrency)
    props.onCurrencyChange(
      {
        "baseCurrency": values.baseCurrency,
        "targetCurrency": values.targetCurrency
      }
    )

    if (values.baseCurrency === values.targetCurrency) {
      setOutput(values.inputAmount)
    }
    else {

      var todayDate = new Date
      if (values.datePicker == undefined || todayDate.toDateString() == values.datePicker.$d.toDateString()) {
        ConvertCurrency(values)
      }
      else {
        ConvertCurrencyForSpecificDate(values)
      }
    }

  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'rgb(239,135,51)' // 
        }
      }}
    >
      <div className="convert-currency-div"  >

        <Form onFinish={onFinish}  >


          <div className="firstRowOfForm">
            
      
            {isMobile ?
              <>

            <Form.Item
              name="inputAmount"
              rules={[{ required: true, message: 'Please enter an amount' }]} >
              <InputNumber className="input-number" min={0} defaultValue={0}  />
            </Form.Item>

            <Form.Item
              className='select-width'
              name="baseCurrency"
              rules={[{ required: true, message: 'Select a currency' }]}>
              <Select
                className='select-height'
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

           

            <Form.Item
    
              className='select-width'
              name="targetCurrency"
              rules={[{ required: true, message: 'Select a currency' }]}>
              <Select
                className='select-height'
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
              </>
              :
              <>

             <Form.Item
              name="inputAmount"
              rules={[{ required: true, message: 'Please enter an amount' }]} >
              <InputNumber className="input-number" min={0} defaultValue={0}  />
            </Form.Item>

            <Form.Item
              className='select-width'
              name="baseCurrency"
              rules={[{ required: true, message: 'Select a currency' }]}>
              <Select
                className='select-height'
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

            
              <div style={{ color: "rgb(239,135,51)" }}>
                <ArrowRightOutlined  />
              </div>

            <Form.Item
              className='select-width'
              name="targetCurrency"
              rules={[{ required: true, message: 'Select a currency' }]}>
              <Select
                className='select-height'
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

              </>
            }

          </div>

          <div className='second-row-form'>
            <Form.Item name="date-picker">
              <DatePicker className='date-picker' />
            </Form.Item>

            {isMobile ?
              <>

                       <Form.Item>
                  <div className='currency-converter-output'>
                    {input} {baseCurrency} = {output} {targetCurrency}
                  </div>
                </Form.Item> 

                
                <Form.Item >
                  <Button className='button' htmlType='submit' >Convert</Button>
                </Form.Item>


       
              </>
              :
              <>

                <Form.Item>

                  <div className='currency-converter-output'>
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
