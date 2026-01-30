import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LineChart } from '@mui/x-charts/LineChart';
import { getRatesLastThreeMonths } from '../../services/api';
import { selectBaseCurrency, selectTargetCurrency } from '../../store/slices/currencySlice';
import '../../index.css';

function CurrencyChart(props) {
  const currentBaseCurrency = useSelector(selectBaseCurrency);
  const currentTargetCurrency = useSelector(selectTargetCurrency);
  
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
    
    try {
      // Validate and parse data
      let newData = currencyRatesForThreeMonths
        .map(rate => {
          const value = Number(rate.rate);
          return isNaN(value) || value < 0 ? null : value;
        })
        .filter(val => val !== null);
      
      let timestamps = currencyRatesForThreeMonths
        .map(rate => {
          const time = new Date(rate.timestamp).getTime();
          return isNaN(time) ? null : time;
        })
        .filter(val => val !== null);

      // Ensure we have matching data and timestamps
      if (newData.length === 0 || timestamps.length === 0 || newData.length !== timestamps.length) {
        console.warn('Invalid data structure in chart data');
        setData([]);
        setTimes([]);
        setMinValue(0);
        setMaxValue(0);
        setYPadding(0);
        return;
      }
   
      setData(newData);
      setTimes(timestamps);

      let min = Math.min(...newData);
      let max = Math.max(...newData);
      let padding = (max - min) * 0.1 || 0.1; // Fallback if difference is 0

      setMinValue(min);
      setMaxValue(max);
      setYPadding(padding);
    } catch (error) {
      console.error('Error converting chart data:', error);
      setData([]);
      setTimes([]);
      setMinValue(0);
      setMaxValue(0);
      setYPadding(0);
    }
  }


  async function GetCurrencyRatesLastThreeMonths() {
    // Validation: Check if currencies are selected
    if (!currentBaseCurrency || !currentTargetCurrency) {
      setData([]);
      setTimes([]);
      setError(null);
      return;
    }

    // Don't fetch if same currency
    if (currentBaseCurrency === currentTargetCurrency) {
      setData([]);
      setTimes([]);
      setError('Please select different currencies');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const request = currentBaseCurrency + currentTargetCurrency;
      console.log('Fetching currency history for:', request);
      
      let response = await getRatesLastThreeMonths(request);
      console.log("Chart response:", response);
      
      if (!response || !response.data) {
        setError('No response from server. Please try again.');
        setData([]);
        setTimes([]);
        return;
      }

      // Backend can return array directly or wrapped in data property
      const dataArray = Array.isArray(response.data) ? response.data : response.data.data;
      
      if (!dataArray || !Array.isArray(dataArray)) {
        setError('Invalid data format received from server');
        setData([]);
        setTimes([]);
        return;
      }

      if (dataArray.length === 0) {
        setError(`No historical data available for ${currentBaseCurrency}/${currentTargetCurrency}`);
        setData([]);
        setTimes([]);
        return;
      }

      ConvertData(dataArray);
      setError(null);
    } catch (err) {
      console.error('Error fetching currency rates:', err);
      const errorMessage = err.message || 'Failed to load chart data. Please try again.';
      setError(errorMessage);
      setData([]);
      setTimes([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    GetCurrencyRatesLastThreeMonths();
  }, [currentTargetCurrency, currentBaseCurrency]);

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
          justifyContent: 'center',
          gap: '10px',
          minHeight: '300px'
        }}>
          <div className="spinner" style={{
            width: '20px',
            height: '20px',
            border: '3px solid rgba(255, 128, 0, 0.3)',
            borderTop: '3px solid #ff8000',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          Loading chart data...
        </div>
      )}
      {error && (
        <div style={{ 
          color: '#ff6b6b',
          background: 'rgba(255, 107, 107, 0.1)',
          border: '1px solid rgba(255, 107, 107, 0.3)',
          borderRadius: '12px',
          padding: '16px',
          minHeight: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem'
        }}>
          ⚠️ {error}
        </div>
      )}
      {!loading && !error && data.length > 0 && (
        <LineChart
          xAxis={[{ 
            data: times.map(time => new Date(time)), 
            scaleType: "time", 
            label: "Date",
            labelStyle: { fill: '#a0aec0', fontSize: 14 },
            tickLabelStyle: { fill: '#e8eaed', fontSize: 12 },
            min: times.length > 0 ? new Date(Math.min(...times)) : undefined,
            max: times.length > 0 ? new Date(Math.max(...times)) : undefined
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
              label: currentTargetCurrency,
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