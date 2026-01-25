import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button } from 'antd';

import RateItem from '../../shared/ui/RateItem';
import { useRates } from './useRates';
import { selectBaseCurrency } from '../../store/slices/currencySlice';


const CommonCurrenciesRates = ({ onRateClick }) => {
  const currentBaseCurrency = useSelector(selectBaseCurrency);
  const { rates, loading, error } = useRates(currentBaseCurrency);
  const [showAll, setShowAll] = useState(false);


  const parsedRates = useMemo(() => {
    return rates.map(item => ({
      currencyCode: item.currencies?.slice(3, 6) || '',
      rate: item.rate,
      fullCode: item.currencies
    }));
  }, [rates]);

  const displayedRates = showAll ? parsedRates : parsedRates.slice(0, 5);

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
          <>
            <div className="rates-list-desktop">
              {parsedRates.map((rate, index) => (
                <RateItem
                  key={`${rate.currencyCode}-${index}`}
                  currencyCode={rate.currencyCode}
                  rate={rate.rate}
                  onClick={() => handleRateClick(rate)}
                />
              ))}
            </div>
            
            <div className="rates-list-mobile">
              {displayedRates.map((rate, index) => (
                <RateItem
                  key={`${rate.currencyCode}-${index}`}
                  currencyCode={rate.currencyCode}
                  rate={rate.rate}
                  onClick={() => handleRateClick(rate)}
                />
              ))}
              
              {parsedRates.length > 5 && (
                <Button
                  type="text"
                  onClick={() => setShowAll(!showAll)}
                  className="rates-see-all-button"
                  style={{
                    width: '100%',
                    marginTop: '12px',
                    color: '#ff8000',
                    fontWeight: '500'
                  }}
                >
                  {showAll ? 'Show Less' : `See All (${parsedRates.length})`}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

CommonCurrenciesRates.propTypes = {
  onRateClick: PropTypes.func
};

export default CommonCurrenciesRates;
