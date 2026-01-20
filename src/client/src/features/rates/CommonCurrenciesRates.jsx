import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import RateItem from '../../shared/ui/RateItem';
import { useRates } from './useRates';
import { selectBaseCurrency } from '../../store/slices/currencySlice';


const CommonCurrenciesRates = ({ onRateClick }) => {
  const currentBaseCurrency = useSelector(selectBaseCurrency);
  const { rates, loading, error } = useRates(currentBaseCurrency);


  const parsedRates = useMemo(() => {
    return rates.map(item => ({
      currencyCode: item.currencies?.slice(3, 6) || '',
      rate: item.rate,
      fullCode: item.currencies
    }));
  }, [rates]);

  const handleRateClick = (rateData) => {
    if (onRateClick) {
      onRateClick(rateData);
    }
  };

  if (error) {
    return (
      <div className="common-currencies-rates">
        <div className="rates-error">
          ⚠️ {error}
        </div>
      </div>
    );
  }

  return (
    <div className="common-currencies-rates">
      <div className="rates-header">
        <h3 className="rates-title">Exchange Rates</h3>
      </div>

      {currentBaseCurrency && (
        <div className="base-currency-card">
          <span className="base-currency-label">Base:</span>
          <span className="base-currency-code">{currentBaseCurrency}</span>
        </div>
      )}

      <div className="rates-divider" />

      <div className="rates-list">
        {loading && rates.length === 0 ? (
          <div className="rates-loading">Loading rates...</div>
        ) : (
          parsedRates.map((rate, index) => (
            <RateItem
              key={`${rate.currencyCode}-${index}`}
              currencyCode={rate.currencyCode}
              rate={rate.rate}
              onClick={() => handleRateClick(rate)}
            />
          ))
        )}
      </div>
    </div>
  );
};

CommonCurrenciesRates.propTypes = {
  onRateClick: PropTypes.func
};

export default CommonCurrenciesRates;
