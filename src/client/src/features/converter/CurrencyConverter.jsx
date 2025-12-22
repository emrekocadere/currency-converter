import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, InputNumber, Select, DatePicker, Button, Tooltip, ConfigProvider } from 'antd';
import { SwapOutlined, CalendarOutlined } from '@ant-design/icons';
import ConversionResult from '../../shared/ui/ConversionResult';
import CurrencyFlag from '../../shared/ui/CurrencyFlag';
import { useConverter } from './useConverter';
import { useResponsive } from '../../shared/hooks/useResponsive';


const CurrencyConverter = ({ onCurrencyChange }) => {
  const [form] = Form.useForm();
  const { isMobile } = useResponsive();
  const { currencyOptions, loading, error, result, resultUpdated, convert } = useConverter();

  const [inputAmount, setInputAmount] = useState(0);
  const [outputAmount, setOutputAmount] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  // Handle currency swap
  const handleSwapCurrencies = useCallback(() => {
    const currentBase = form.getFieldValue('baseCurrency');
    const currentTarget = form.getFieldValue('targetCurrency');

    if (currentBase && currentTarget) {
      form.setFieldsValue({
        baseCurrency: currentTarget,
        targetCurrency: currentBase,
      });

      // Swap values
      setBaseCurrency(currentTarget);
      setTargetCurrency(currentBase);
      setInputAmount(outputAmount);
      setOutputAmount(inputAmount);

      if (onCurrencyChange) {
        onCurrencyChange({
          baseCurrency: currentTarget,
          targetCurrency: currentBase
        });
      }
    }
  }, [form, inputAmount, outputAmount, onCurrencyChange]);

  // Handle form submission
  const onFinish = useCallback(async (values) => {
    const { inputAmount: amount, baseCurrency: base, targetCurrency: target, datePicker } = values;

    setInputAmount(amount);
    setBaseCurrency(base);
    setTargetCurrency(target);

    if (onCurrencyChange) {
      onCurrencyChange({ baseCurrency: base, targetCurrency: target });
    }

    // Same currency check
    if (base === target) {
      setOutputAmount(amount);
      return;
    }

    try {
      const date = datePicker?.$d || datePicker;
      const result = await convert(amount, base, target, date);
      setOutputAmount(result);
    } catch (err) {
      console.error('Conversion failed:', err);
    }
  }, [convert, onCurrencyChange]);

  // Render currency option
  const renderCurrencyOption = (currency, isDropdown = false) => (
    <div className={isDropdown ? 'converter-currency-option-dropdown' : 'converter-currency-option'}>
      <CurrencyFlag currencyCode={currency.code} className={isDropdown ? 'converter-currency-flag-dropdown' : 'converter-currency-flag'} />
      {currency.code}
    </div>
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
          {/* Amount and Date Row */}
          <div className="converter-top-row">
            <Form.Item
              name="inputAmount"
              label={<span className="converter-input-label">Amount</span>}
              rules={[{ required: true, message: 'Please enter an amount' }]}
              className="converter-amount-item"
            >
              <InputNumber 
                className="input-number" 
                min={0} 
                defaultValue={0} 
                placeholder="Enter amount" 
              />
            </Form.Item>

            <Form.Item
              name="datePicker"
              label={<span className="converter-input-label">Select Date (Optional)</span>}
              className="converter-date-item"
            >
              <DatePicker
                className="date-picker"
                suffixIcon={<CalendarOutlined />}
                placeholder="Today"
              />
            </Form.Item>
          </div>

          {/* Currency Selection Row */}
          <div className="firstRowOfForm">
            <Form.Item
              className="select-width"
              name="baseCurrency"
              label={<span className="converter-input-label">From Currency</span>}
              rules={[{ required: true, message: 'Select a currency' }]}
            >
              <Select
                className="select-height"
                showSearch
                placeholder="Select Base Currency"
                filterOption={(input, option) =>
                  (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                }
                optionLabelProp="label"
              >
                {currencyOptions.map((currency) => (
                  <Select.Option
                    key={currency.code}
                    value={currency.code}
                    label={renderCurrencyOption(currency)}
                  >
                    {renderCurrencyOption(currency, true)}
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
              className="select-width"
              name="targetCurrency"
              label={<span className="converter-input-label">To Currency</span>}
              rules={[{ required: true, message: 'Select a currency' }]}
            >
              <Select
                className="select-height"
                showSearch
                placeholder="Select Target Currency"
                filterOption={(input, option) =>
                  (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                }
                optionLabelProp="label"
              >
                {currencyOptions.map((currency) => (
                  <Select.Option
                    key={currency.code}
                    value={currency.code}
                    label={renderCurrencyOption(currency)}
                  >
                    {renderCurrencyOption(currency, true)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* Output Section */}
          <div className="converter-form-output-section">
            <Form.Item className="converter-output-container">
              {baseCurrency && targetCurrency && (
                <ConversionResult
                  inputAmount={inputAmount}
                  outputAmount={outputAmount}
                  baseCurrency={baseCurrency}
                  targetCurrency={targetCurrency}
                  isAnimated={resultUpdated}
                />
              )}
            </Form.Item>

            <Form.Item className="converter-submit-button-container">
              <Button
                className="button converter-submit-button"
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}
                size="large"
              >
                {loading ? 'Converting...' : 'Convert'}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </ConfigProvider>
  );
};

CurrencyConverter.propTypes = {
  onCurrencyChange: PropTypes.func
};

export default CurrencyConverter;
