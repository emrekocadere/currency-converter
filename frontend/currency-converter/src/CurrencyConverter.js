import React, { useState, useEffect } from 'react';
import './App.css';
import { InputNumber, Select, DatePicker, Button, Form, ConfigProvider, Tooltip } from 'antd';
import { getCurrencies, convertCurrency, convertCurrencyOnDate } from './apiService';
import { SwapOutlined, CalendarOutlined } from '@ant-design/icons';
import useResponsive from "./useResponsive";
import { currencyImages } from './CommonCurrenciesRates';

import "./index.css";
function CurrencyConverter(props) {
  const [output, setOutput] = useState(0);
  const [input, setInput] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultUpdated, setResultUpdated] = useState(false);
  const [form] = Form.useForm();

  const { isMobile } = useResponsive();

  const formatNumber = (value) => {
    if (!value || value === 0) return '0.00';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(value);
  };

  const handleSwapCurrencies = () => {
    const currentBase = form.getFieldValue('baseCurrency');
    const currentTarget = form.getFieldValue('targetCurrency');
    
    if (currentBase && currentTarget) {
      form.setFieldsValue({
        baseCurrency: currentTarget,
        targetCurrency: currentBase,
      });
      
      // Swap output and input visually
      const temp = input;
      setInput(output);
      setOutput(temp);
      
      setBaseCurrency(currentTarget);
      setTargetCurrency(currentBase);
      
      if (props.onCurrencyChange) {
        props.onCurrencyChange({
          baseCurrency: currentTarget,
          targetCurrency: currentBase
        });
      }
    }
  };


  async function ConvertCurrency(values) {
    try {
      setLoading(true);
      setError(null);
      let response = await convertCurrency(values.inputAmount, values.baseCurrency + values.targetCurrency);
      setOutput(response.data.data);
      
      // Trigger animation
      setResultUpdated(true);
      setTimeout(() => setResultUpdated(false), 800);
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
      
      // Trigger animation
      setResultUpdated(true);
      setTimeout(() => setResultUpdated(false), 800);
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
      console.log('Currencies fetched:', response.value);
      setCurrencyOptions(response.value);
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

  const renderOutputAndButton = () => (
    <>
      <Form.Item className="converter-output-container">
        <div className={`currency-converter-output ${resultUpdated ? 'result-updated' : ''}`}>
          <div className="converter-output-flex">
            <Tooltip title={`${input} ${baseCurrency}`}>
              <div className="converter-output-currency">
                {currencyImages[baseCurrency] && (
                  <img 
                    src={currencyImages[baseCurrency]} 
                    alt={baseCurrency}
                    className="converter-output-currency-flag"
                  />
                )}
                <span className="converter-output-value">{formatNumber(input)}</span>
                <span className="converter-output-code">{baseCurrency}</span>
              </div>
            </Tooltip>
            
            <span className="converter-output-equals">
              =
            </span>
            
            <Tooltip title={`${output} ${targetCurrency}`}>
              <div className="converter-output-currency-right">
                <span className="converter-output-code">{targetCurrency}</span>
                <span className="converter-output-value">{formatNumber(output)}</span>
                {currencyImages[targetCurrency] && (
                  <img 
                    src={currencyImages[targetCurrency]} 
                    alt={targetCurrency}
                    className="converter-output-currency-flag"
                  />
                )}
              </div>
            </Tooltip>
          </div>
        </div>
      </Form.Item>

      <Form.Item className="converter-submit-button-container">
        <Button 
          className='button converter-submit-button' 
          type="primary"
          htmlType='submit' 
          loading={loading}
          disabled={loading}
          size="large"
        >
          {loading ? 'Converting...' : '🚀 Convert'}
        </Button>
      </Form.Item>
    </>
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ff8000',
          colorBgContainer: 'rgba(255, 255, 255, 0.05)',
          colorBorder: 'rgba(255, 128, 0, 0.2)',
          colorText: '#e8eaed',
        },
        components: {
          Select: {
            optionSelectedBg: 'rgba(255, 128, 0, 0.15)',
          },
          DatePicker: {
            cellHoverBg: 'rgba(255, 128, 0, 0.1)',
          }
        }
      }}
    >
      <div className="convert-currency-div">
        {error && (
          <div className="converter-error-message">
            ⚠️ {error}
          </div>
        )}
        
        <Form form={form} onFinish={onFinish} layout="vertical">
          <div className="converter-top-row">
            <Form.Item
              name="inputAmount"
              label={<span className="converter-input-label">💰 Amount</span>}
              rules={[{ required: true, message: 'Please enter an amount' }]}
              className="converter-amount-item"
            >
              <InputNumber className="input-number" min={0} defaultValue={0} placeholder="Enter amount" />
            </Form.Item>

            <Form.Item 
              name="datePicker"
              label={<span className="converter-input-label">📅 Select Date (Optional)</span>}
              className="converter-date-item"
            >
              <DatePicker 
                className='date-picker' 
                suffixIcon={<CalendarOutlined />}
                placeholder="Today"
              />
            </Form.Item>
          </div>

          <div className="firstRowOfForm">
            <Form.Item
              className='select-width'
              name="baseCurrency"
              label={<span className="converter-input-label">📤 From Currency</span>}
              rules={[{ required: true, message: 'Select a currency' }]}
            >
              <Select
                className='select-height'
                showSearch
                placeholder="Select Base Currency"
                filterOption={(input, option) =>
                  (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                }
                optionLabelProp="label"
                dropdownStyle={{ fontSize: '1.1em', minHeight: 36 }}
              >
                {currencyOptions.map((currency) => (
                  <Select.Option 
                    key={currency.code} 
                    value={currency.code}
                    label={
                      <div className="converter-currency-option">
                        {currencyImages[currency.code] && (
                          <img 
                            src={currencyImages[currency.code]} 
                            alt={currency.code}
                            className="converter-currency-flag"
                          />
                        )}  
                        {currency.code}
                      </div>
                    }
                  >
                    <div className="converter-currency-option-dropdown">
                      {currencyImages[currency.code] && (
                        <img 
                          src={currencyImages[currency.code]} 
                          alt={currency.code}
                          className="converter-currency-flag-dropdown"
                        />
                      )}
                      {currency.code}
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            
            <Tooltip title="Swap currencies">
              <Button
                type="text"
                icon={<SwapOutlined />}
                onClick={handleSwapCurrencies}
                className="converter-swap-button"
              />
            </Tooltip>

            <Form.Item
              className='select-width'  
              name="targetCurrency"
              label={<span className="converter-input-label">📥 To Currency</span>}
              rules={[{ required: true, message: 'Select a currency' }]}
            >
              <Select
                className='select-height'
                showSearch
                placeholder="Select Target Currency"
                filterOption={(input, option) =>
                  (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                }
                optionLabelProp="label"
                dropdownStyle={{ fontSize: '1.1em', minHeight: 36 }}
              >
                {currencyOptions.map((currency) => (
                  <Select.Option 
                    key={currency.code} 
                    value={currency.code}
                    label={
                      <div className="converter-currency-option">
                        {currencyImages[currency.code] && (
                          <img 
                            src={currencyImages[currency.code]} 
                            alt={currency.code}
                            className="converter-currency-flag"
                          />
                        )}
                        {currency.code}
                      </div>
                    }
                  >
                    <div className="converter-currency-option-dropdown">
                      {currencyImages[currency.code] && (
                        <img 
                          src={currencyImages[currency.code]} 
                          alt={currency.code}
                          className="converter-currency-flag-dropdown"
                        />
                      )}
                      {currency.code}
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="converter-form-output-section">
            {renderOutputAndButton()}
          </div>
        </Form>
      </div>
    </ConfigProvider>
  );
}

export default CurrencyConverter;
