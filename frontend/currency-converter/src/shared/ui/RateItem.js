import React from 'react';
import PropTypes from 'prop-types';
import { formatRate } from '../../utils/formatters';
import CurrencyFlag from './CurrencyFlag';

/**
 * RateItem - Individual currency rate item
 */
function RateItem({ currencyCode, rate, onClick }) {
  return (
    <div 
      className="rate-item" 
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="rate-item-left">
        <div className="rate-flag-wrapper">
          <CurrencyFlag currencyCode={currencyCode} className="rate-flag" />
        </div>
        <span className="rate-currency-code">{currencyCode}</span>
      </div>
      <div className="rate-item-right">
        <span className="rate-value">{formatRate(rate)}</span>
        <div className="rate-arrow">→</div>
      </div>
    </div>
  );
}

RateItem.propTypes = {
  currencyCode: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  onClick: PropTypes.func
};

export default RateItem;
