import axios from 'axios';

// Base URL'i merkezi olarak yönetmek için
const BASE_URL = 'http://localhost:5203/api/CurrencyConverter';

// Axios instance oluşturma
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 saniye timeout
});

// Response interceptor ile error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);



export async function convertCurrency(amount, currencies) {
  const response = await apiClient.get('/exchange', {
    params: {
      amount: amount,
      currencies: currencies
    }
  });
  return response;
}

export async function getNews() {
  const response = await apiClient.get('/news');
  console.log(response);
  return response.data;
}

export async function getCurrencies() {
  const response = await apiClient.get('/currencies');
  console.log(response);
  return response.data;
}

export async function getConvertedRates(requestbody) {
  const response = await apiClient.post('/GetConvertCurrencyRates', requestbody);
  return response.data;
}

export async function getRatesForCurrency(request) {
  const response = await apiClient.get('/currency-rates', {
    params: {
      currency: request
    }
  });
  return response;
}

export async function convertCurrencyOnDate(request) {
  const response = await apiClient.post('/ConvertCurrencyForSpecificDate', request);
  return response;
}

export async function saveUserLocation(request) {
  const response = await apiClient.post('/SaveUserLocation', request);
  return response;
}

export async function getRatesLastThreeMonths(request) {
  const response = await apiClient.get('/currency-rates/history', {
    params: {
      currencies: request
    }
  });
  console.log("Response from getRatesLastThreeMonths:", response.data);
  return response;
}

export async function getPaginatedResults(request) {
  const response = await apiClient.get('/news', {
    params: {
      pageNumber: request
    }
  });
  return response;
}

export async function getUserIp() {
  const response = await axios.get('https://ipapi.co/json');
  return response;
}


