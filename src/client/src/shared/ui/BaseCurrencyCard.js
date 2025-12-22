import React from 'react';
import PropTypes from 'prop-types';

/**
 * BaseCurrencyCard - Displays the base currency
 */
function BaseCurrencyCard({ currencyCode }) {
  return (
    <div className="base-currency-card">
      <span className="base-currency-label">Base Currency:</span>
      <span className="base-currency-code">{currencyCode}</span>
    </div>
  );
}

BaseCurrencyCard.propTypes = {
  currencyCode: PropTypes.string.isRequired
};

export default BaseCurrencyCard;
