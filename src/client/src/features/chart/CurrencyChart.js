import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { getRatesLastThreeMonths } from '../../services/api';
import '../../index.css';

function CurrencyChart(props) {
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
      console.log("response", response);
      if (response && response.data) {
        // Backend doğrudan array döndürüyor
        const dataArray = Array.isArray(response.data) ? response.data : response.data.data;
        if (dataArray && dataArray.length > 0) {
          ConvertData(dataArray);
        } else {
          setError('Veri alınamadı');
        }
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
    <div className='chart' style={{ 
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 128, 0, 0.2)',
      padding: '24px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    }}>
      {loading && (
        <div style={{ 
          color: '#a0aec0', 
          fontSize: '1.1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
           Loading...
        </div>
      )}
      {error && (
        <div style={{ 
          color: '#ff6b6b',
          background: 'rgba(255, 107, 107, 0.1)',
          border: '1px solid rgba(255, 107, 107, 0.3)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          {error}
        </div>
      )}
      {!loading && !error && data.length > 0 && (
        <LineChart
          xAxis={[{ 
            data: times.map(time => new Date(time)), 
            scaleType: "time", 
            label: "Date",
            labelStyle: { fill: '#a0aec0', fontSize: 14 },
            tickLabelStyle: { fill: '#e8eaed', fontSize: 12 }
          }]}
          yAxis={[{ 
            min: minValue - yPadding, 
            max: maxValue + yPadding,
            labelStyle: { fill: '#a0aec0', fontSize: 14 },
            tickLabelStyle: { fill: '#e8eaed', fontSize: 12 }
          }]}
          series={[
            {
              data: data,
              label: props.currentTargetCurrency,
              showMark: false,
              color: '#ff8000',
              curve: 'natural',
            },
          ]}
          height={300}
          margin={{ left: 70, right: 20, top: 20, bottom: 60 }}
          sx={{
            '& .MuiLineElement-root': {
              strokeWidth: 3,
              filter: 'drop-shadow(0 0 8px rgba(255, 128, 0, 0.5))'
            },
            '& .MuiMarkElement-root': {
              fill: '#ff8000',
              strokeWidth: 2,
              stroke: '#fff',
              r: 4,
            },
            '& .MuiChartsAxis-line': {
              stroke: 'rgba(255, 255, 255, 0.1)',
              strokeWidth: 1
            },
            '& .MuiChartsAxis-tick': {
              stroke: 'rgba(255, 255, 255, 0.1)',
              strokeWidth: 1
            },
            '& .MuiChartsGrid-line': {
              stroke: 'rgba(255, 255, 255, 0.05)',
              strokeWidth: 1
            },
            '& .MuiChartsLegend-series text': {
              fill: '#e8eaed !important',
              fontSize: '14px !important'
            },
            '& .MuiChartsTooltip-root': {
              background: 'rgba(16, 20, 36, 0.95)',
              border: '1px solid rgba(255, 128, 0, 0.3)',
              borderRadius: '8px',
              color: '#e8eaed'
            }
          }}
        />
      )}
      {!loading && !error && data.length === 0 && (
        <div style={{ 
          color: '#a0aec0',
          fontSize: '1rem',
          textAlign: 'center'
        }}>
          No data available to display the chart.
        </div>
      )}
    </div>
  );
}

export default CurrencyChart;