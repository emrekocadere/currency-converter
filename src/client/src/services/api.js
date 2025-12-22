import axios from 'axios';

const API_BASE_URL = 'http://localhost:5203/api/CurrencyConverter';

export async function convertCurrency(amount, currencies) {



    try {
       const response = await axios.get(`${API_BASE_URL}/exchange`, {
            params: { amount, currencies }
        });
        return response;
    } catch (error) {
        console.error('API Error:', error);
        if (error.response) {
            throw new Error(error.response.data?.message || `API Error: ${error.response.status}`);
        } else if (error.request) {
            throw new Error('Network error. Please check your connection.');
        } else {
            throw new Error('Failed to convert currency. Please try again.');
        }
    }
}

export async function convertCurrencyOnDate(request) {
    try {
        const response = await axios.get(`${API_BASE_URL}/exchange/by-date`, {
            params: {
                date: request.date,
                currencies: request.currencies,
                amount: request.amount
            }
        });
        return response;
    } catch (error) {
        console.error('API Error:', error);
        if (error.response) {
            throw new Error(error.response.data?.message || `API Error: ${error.response.status}`);
        } else if (error.request) {
            throw new Error('Network error. Please check your connection.');
        } else {
            throw new Error('Failed to convert currency. Please try again.');
        }
    }
}


export async function getPaginatedResults(pageNumber) {
    const response = await axios.get(`${API_BASE_URL}/news`, {
        params: { pageNumber }
    });
    return response;
}


export async function getCurrencies() {
    const response = await axios.get(`${API_BASE_URL}/currencies`);
    console.log('Fetched currencies:', response.data);
    return response.data;
}

export async function getConvertedRates(requestbody) {
    const response = await axios.post(`${API_BASE_URL}/GetConvertCurrencyRates`, requestbody);
    return response.data;
}

export async function getCommonCurrencyRates(baseCurrency) {
    const response = await axios.get(`${API_BASE_URL}/currency-rates`, {
        params: { currency: baseCurrency }
    });
    return response.data;
}

export async function getRatesForCurrency(currency) {
    const response = await axios.get(`${API_BASE_URL}/currency-rates`, {
        params: { currency }
    });
    return response;
}

export async function getRatesLastThreeMonths(currencies) {
    const response = await axios.get(`${API_BASE_URL}/currency-rates/history`, {
        params: { currencies }
    });
    return response;
}

export async function saveUserLocation(request) {
    const response = await axios.post(`${API_BASE_URL}/SaveUserLocation`, request);
    return response;
}
