import { useState, useCallback, useEffect } from 'react';
import { getCurrencies, convertCurrency, convertCurrencyOnDate } from '../../services/api';

/**
 * Custom hook for currency conversion logic
 */
export function useConverter() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [resultUpdated, setResultUpdated] = useState(false);

  // Fetch available currencies
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await getCurrencies();
        // API returns { isSuccess: true, value: Array }
        const currencies = response?.value || [];
        setCurrencyOptions(currencies.map(currency => ({ code: currency.code })));
      } catch (err) {
        console.error('Failed to fetch currencies:', err);
        setError('Failed to load currencies');
      }
    };

    fetchCurrencies();
  }, []);

  // Convert currency
  const convert = useCallback(async (amount, baseCurrency, targetCurrency, date = null) => {
    setLoading(true);
    setError(null);
    setResultUpdated(false);

    try {
      const currencies = `${baseCurrency}${targetCurrency}`;
      
      let response;
      if (date) {
        response = await convertCurrencyOnDate({
          date: date.toISOString().split('T')[0],
          currencies,
          amount
        });
      } else {
        response = await convertCurrency(amount, currencies);
      }

      const convertedAmount = response.data?.outputAmount || 0;
      setResult(convertedAmount);
      setResultUpdated(true);
      
      return convertedAmount;
    } catch (err) {
      console.error('Conversion error:', err);
      setError('Conversion failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
      setTimeout(() => setResultUpdated(false), 500);
    }
  }, []);

  return {
    currencyOptions,
    loading,
    error,
    result,
    resultUpdated,
    convert
  };
}
