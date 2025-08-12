import React, { useState, useEffect } from 'react';
import './App.css';
import { InputNumber, Select, DatePicker, Button, Form, ConfigProvider } from 'antd';
import { getCurrencies, convertCurrency, convertCurrencyOnDate } from './apiService';
import { ArrowRightOutlined } from '@ant-design/icons';
import useResponsive from "./useResponsive";

import "./index.css";
function CurrencyConverter(props) {
  const [output, setOutput] = useState(0);
  const [input, setInput] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isMobile } = useResponsive();


  async function ConvertCurrency(values) {
    try {
      setLoading(true);
      setError(null);
      let response = await convertCurrency(values.inputAmount, values.baseCurrency + values.targetCurrency);
      setOutput(response.data.data);
    } catch (err) {
      console.error('Currency conversion error:', err);
      setError('Currency conversion failed');
    } finally {
      setLoading(false);
    }
  }



  async function ConvertCurrencyForSpecificDate(values) {
    try {
      setLoading(true);
      setError(null);
      
      const date = values.datePicker?.$d || values.datePicker;
      if (!date) {
        throw new Error('Please select a valid date');
      }
      
      const year = date.getFullYear(); 
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const day = String(date.getDate()).padStart(2, '0'); 

      const formattedDate = `${year}-${month}-${day}`;

      let responseBody = {
        date: formattedDate,
        currencies: values.baseCurrency + values.targetCurrency,
        amount: values.inputAmount
      };
      
      let response = await convertCurrencyOnDate(responseBody);
      setOutput(response.data);
    } catch (err) {
      console.error('Date specific currency conversion error:', err);
      setError('Currency conversion for specific date failed');
    } finally {
      setLoading(false);
    }
  }

  async function GetCurrencies() {
    try {
      let response = await getCurrencies();
      setCurrencyOptions(response);
    } catch (err) {
      console.error('Get currencies error:', err);
      setError('Error occurred while loading currencies');
    }
  }

  useEffect(() => {
    GetCurrencies();
  }, []);

  const onFinish = (values) => {
    setInput(values.inputAmount);
    setBaseCurrency(values.baseCurrency);
    setTargetCurrency(values.targetCurrency);
    
    if (props.onCurrencyChange) {
      props.onCurrencyChange({
        baseCurrency: values.baseCurrency,
        targetCurrency: values.targetCurrency
      });
    }

    if (values.baseCurrency === values.targetCurrency) {
      setOutput(values.inputAmount);
      return;
    }

    const todayDate = new Date();
    const isToday = !values.datePicker || 
                   todayDate.toDateString() === (values.datePicker?.$d || values.datePicker)?.toDateString();
    
    if (isToday) {
      ConvertCurrency(values);
    } else {
      ConvertCurrencyForSpecificDate(values);
    }
  };

  // Form bileşenlerini render eden yardımcı fonksiyon
  const renderFormFields = () => (
    <>
      <Form.Item
        name="inputAmount"
        rules={[{ required: true, message: 'Please enter an amount' }]}
      >
        <InputNumber className="input-number" min={0} defaultValue={0} />
      </Form.Item>

      <Form.Item
        className='select-width'
        name="baseCurrency"
        rules={[{ required: true, message: 'Select a currency' }]}
      >
        <Select
          className='select-height'
          showSearch
          placeholder="Select Base Currency"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={currencyOptions.map((currency) => ({
            value: currency.code,
            label: currency.code
          }))}
        />
      </Form.Item>

      {!isMobile && (
        <div style={{ color: "rgb(239,135,51)" }}>
          <ArrowRightOutlined />
        </div>
      )}

      <Form.Item
        className='select-width'
        name="targetCurrency"
        rules={[{ required: true, message: 'Select a currency' }]}
      >
        <Select
          className='select-height'
          showSearch
          placeholder="Select Target Currency"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={currencyOptions.map((currency) => ({
            value: currency.code,
            label: currency.code
          }))}
        />
      </Form.Item>
    </>
  );

  const renderOutputAndButton = () => (
    <>
      <Form.Item>
        <div className='currency-converter-output'>
          {input} {baseCurrency} = {output} {targetCurrency}
        </div>
      </Form.Item>

      <Form.Item>
        <Button 
          className='button' 
          htmlType='submit' 
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Converting...' : 'Convert'}
        </Button>
      </Form.Item>
    </>
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'rgb(239,135,51)' // 
        }
      }}
    >
      <div className="convert-currency-div">
        {error && (
          <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>
            {error}
          </div>
        )}
        
        <Form onFinish={onFinish}>
          <div className="firstRowOfForm">
            {renderFormFields()}
          </div>

          <div className='second-row-form'>
            <Form.Item name="datePicker">
              <DatePicker className='date-picker' />
            </Form.Item>
            {renderOutputAndButton()}
          </div>
        </Form>

      </div>


    </ConfigProvider>
  );
}

export default CurrencyConverter;
