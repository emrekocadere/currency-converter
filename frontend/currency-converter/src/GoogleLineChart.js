import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

import "./index.css"
import { getRatesLastThreeMonths } from './apiService';

function GoogleLineChart(props) {
  const [data, setData] = useState([]);
  const [times, setTimes] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [yPadding, setYPadding] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  function ConvertData(currencyRatesForThreeMonths) {
    if (!currencyRatesForThreeMonths || currencyRatesForThreeMonths.length === 0) {
      setData([]);
      setTimes([]);
      setMinValue(0);
      setMaxValue(0);
      setYPadding(0);
      return;
    }

    console.log("currencyRatesForThreeMonths", currencyRatesForThreeMonths);
    
    let newData = currencyRatesForThreeMonths.map(rate => Number(rate.rate) || 0);
    let timestamps = currencyRatesForThreeMonths.map(rate => new Date(rate.timestamp).getTime());
 
    setData(newData);
    setTimes(timestamps);

    let min = Math.min(...newData);
    let max = Math.max(...newData);
    let padding = (max - min) * 0.1;

    setMinValue(min);
    setMaxValue(max);
    setYPadding(padding);
  }


  async function GetCurrencyRatesLastThreeMonths() {
    if (!props.currentBaseCurrency || !props.currentTargetCurrency) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const request = props.currentBaseCurrency + props.currentTargetCurrency;
      let response = await getRatesLastThreeMonths(request);
      
      if (response && response.data && response.data.data) {
        ConvertData(response.data.data);
      } else {
        setError('Veri alınamadı');
      }
    } catch (err) {
      console.error('Error fetching currency rates:', err);
      setError('Veri yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    GetCurrencyRatesLastThreeMonths();
  }, [props.currentTargetCurrency, props.currentBaseCurrency]);

  return (
    <div className='chart'>
      {loading && <div>Yükleniyor...</div>}
      {error && <div style={{ color: 'red' }}>Hata: {error}</div>}
      {!loading && !error && data.length > 0 && (
        <LineChart
          xAxis={[{ data: times.map(time => new Date(time)), scaleType: "time", label: "Date" }]}
          yAxis={[{ min: minValue - yPadding, max: maxValue + yPadding }]}
          series={[
            {
              data: data,
              label: props.currentTargetCurrency,
              showMark: false,
            },
          ]}
          height={300}
          colors={['rgb(239,135,51)']}
        />
      )}
      {!loading && !error && data.length === 0 && (
        <div>Gösterilecek veri bulunamadı</div>
      )}
    </div>
  );
}

export default GoogleLineChart;