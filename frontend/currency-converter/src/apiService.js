import axios from 'axios';



export async function convertCurrency(amount, currencies) {

    const response = await axios.get('http://localhost:5203/api/CurrencyConverter/exchange',{
        params: {
            amount: amount,
            currencies: currencies
        }
    })
    return response
}


export async function getNews() {

    const response = await axios.get('http://localhost:5203/api/CurrencyConverter/news');
    console.log(response);
    return response.data;
}



export async function getCurrencies() {

    const response = await axios.get('http://localhost:5203/api/CurrencyConverter/currencies')
    console.log(response)
    return response.data
}

// export  function GetCurrencies() {

//     const response = axios.get('http://localhost:5203/api/CurrencyConverter/GetCurrencies')
//     console.log(response)
//     return response
// }//Promise {<pending>}




export async function getConvertedRates(requestbody) {

    const response = await axios.post('http://localhost:5203/api/CurrencyConverter/GetConvertCurrencyRates', requestbody)
    return response.data


}

export async function getRatesForCurrency(request) {

    const response = await axios.get('http://localhost:5203/api/CurrencyConverter/currency-rates',{
        params: {
            currency: request
        }
    })

    return response
}

export async function convertCurrencyOnDate(request) {

    const response = await axios.post('http://localhost:5203/api/CurrencyConverter/ConvertCurrencyForSpecificDate', request)
    return response
}


export async function saveUserLocation(request) {

    const response = await axios.post('http://localhost:5203/api/CurrencyConverter/SaveUserLocation', request)
    return response
}


export async function getRatesLastThreeMonths(request) {

    const response = await axios.get('http://localhost:5203/api/CurrencyConverter/currency-rates/history', {
        params: {
            currencies: request
        }
    })
    console.log("Response from getRatesLastThreeMonths:", response.data);
    return response
}

export async function getPaginatedResults(request) {

    const response = await axios.get('http://localhost:5203/api/CurrencyConverter/news', {
        params: {
            pageNumber: request
        }
    })
    return response
}

export async function getUserIp() {

    const response = await axios.get('https://ipapi.co/json')
    return response
}


