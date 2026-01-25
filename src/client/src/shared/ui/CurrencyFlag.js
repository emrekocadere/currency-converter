import React from 'react';

// Import SVG flags
import euFlag from '../../Images/eu.svg';
import usFlag from '../../Images/us.svg';
import gbFlag from '../../Images/gb.svg';
import auFlag from '../../Images/au.svg';
import chFlag from '../../Images/ch.svg';
import caFlag from '../../Images/ca.svg';
import jpFlag from '../../Images/jp.svg';
import trFlag from '../../Images/tr.svg';
import ruFlag from '../../Images/ru.svg';
import noFlag from '../../Images/no.svg';
import seFlag from '../../Images/se.svg';
import czFlag from '../../Images/cz.svg';
import rsFlag from '../../Images/rs.svg';
import dkFlag from '../../Images/dk.svg';
import nzFlag from '../../Images/nz.svg';

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
    TRY: trFlag,
    RUB: ruFlag,
    NOK: noFlag,
    SEK: seFlag,
    CZK: czFlag,
    RSD: rsFlag,
    DKK: dkFlag,
    NZD: nzFlag,
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
