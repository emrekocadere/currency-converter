import React, { useState, useEffect } from 'react';
import './App.css';
import { InputNumber, Select, DatePicker, Button, Form, ConfigProvider } from 'antd';
import { GetCurrenciesAsync, ConvertCurrencyAsync, GetConvertCurrencyRatesAsync } from './apiService';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive'
import "./index.css"

function CurrencyConverter(props) {

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

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
      <div className="convertCurrencyDiv"  >


        <Form onFinish={onFinish}>

          <div className="firstRowOfForm">

            <Form.Item
              name="inputAmount" >
              <InputNumber className="inputNumber" min={0} defaultValue={3} size={'large'} />
            </Form.Item>

            <Form.Item className='selectWidth' name="baseCurrency">
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

            {isTabletOrMobile ? null :
              <div style={{ color: "rgb(239,135,51)" }}>
                <ArrowRightOutlined />
              </div>}


            <Form.Item className='selectWidth' name="targetCurrency" >
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
          </div>


        </Form>

      </div>
    </ConfigProvider>
  );
}

export default CurrencyConverter;
