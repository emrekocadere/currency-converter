import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import CurrencyFlag from './CurrencyFlag';
import { formatNumber } from '../../utils/formatters';

/**
 * ConversionResult - Displays currency conversion output
 */
const ConversionResult = memo(({ 
  inputAmount, 
  outputAmount, 
  baseCurrency, 
  targetCurrency, 
  isAnimated 
}) => {
  return (
    <div className={`currency-converter-output ${isAnimated ? 'result-updated' : ''}`}>
      <div className="converter-output-flex">
        <Tooltip title={`${inputAmount} ${baseCurrency}`}>
          <div className="converter-output-currency">
            <CurrencyFlag currencyCode={baseCurrency} className="converter-output-currency-flag" />
            <span className="converter-output-value">{formatNumber(inputAmount)}</span>
            <span className="converter-output-code">{baseCurrency}</span>
          </div>
        </Tooltip>

        <span className="converter-output-equals">=</span>

        <Tooltip title={`${outputAmount} ${targetCurrency}`}>
          <div className="converter-output-currency-right">
            <span className="converter-output-code">{targetCurrency}</span>
            <span className="converter-output-value">{formatNumber(outputAmount)}</span>
            <CurrencyFlag currencyCode={targetCurrency} className="converter-output-currency-flag" />
          </div>
        </Tooltip>
      </div>
    </div>
  );
});

ConversionResult.displayName = 'ConversionResult';

ConversionResult.propTypes = {
  inputAmount: PropTypes.number.isRequired,
  outputAmount: PropTypes.number.isRequired,
  baseCurrency: PropTypes.string.isRequired,
  targetCurrency: PropTypes.string.isRequired,
  isAnimated: PropTypes.bool
};

ConversionResult.defaultProps = {
  isAnimated: false
};

export default ConversionResult;
