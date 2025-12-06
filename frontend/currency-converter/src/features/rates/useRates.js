import { useState, useEffect } from 'react';
import { getCommonCurrencyRates } from '../../services/api';


export function useRates(baseCurrency) {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!baseCurrency) return;

    const fetchRates = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getCommonCurrencyRates(baseCurrency);
        setRates(data.value || []);
      } catch (err) {
        console.error('Failed to fetch rates:', err);
        setError('Failed to load exchange rates');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [baseCurrency]);

  return { rates, loading, error };
}
