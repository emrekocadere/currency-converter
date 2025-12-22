import React from 'react';

// Import SVG flags
import euFlag from '../../Images/eu.svg';
import usFlag from '../../Images/us.svg';
import gbFlag from '../../Images/gb.svg';
import auFlag from '../../Images/au.svg';
import chFlag from '../../Images/ch.svg';
import caFlag from '../../Images/ca.svg';
import jpFlag from '../../Images/jp.svg';

/**
 * CurrencyFlag Component - Displays currency flag SVG
 */
function CurrencyFlag({ currencyCode, className }) {
  // Currency to SVG Flag mapping
  const currencyFlags = {
    EUR: euFlag,
    USD: usFlag,
    GBP: gbFlag,
    AUD: auFlag,
    CHF: chFlag,
    CAD: caFlag,
    JPY: jpFlag,
  };

  const flagSrc = currencyFlags[currencyCode];

  if (!flagSrc) {
    // Fallback to currency code if flag not available
    return (
      <span className={`currency-flag ${className || ''}`}>
        {currencyCode?.substring(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <img 
      src={flagSrc} 
      alt={currencyCode}
      className={`currency-flag ${className || ''}`}
      style={{ width: '24px', height: '16px', objectFit: 'cover' }}
    />
  );
}

export default CurrencyFlag;
