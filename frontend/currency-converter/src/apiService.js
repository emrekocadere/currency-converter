import axios from 'axios';



export async function convertCurrency(requestbody) {

    console.log(requestbody)
    const response = await axios.post('http://localhost:5203/api/CurrencyConverter/ConvertCurrency', requestbody)
    return response
}


export async function getNews() {

    // await axios.get('http://localhost:5203/api/CurrencyConverter/GetNewsFromDb')
    //   .then(function (response) {
    //     // handle success
    //     console.log(response);
    //     return "ne haber";
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   });



    const response = await axios.get('http://localhost:5203/api/CurrencyConverter/GetNewsFromDb');
    console.log(response);
    return response.data;
}



export async function getCurrencies() {

    const response = await axios.get('http://localhost:5203/api/CurrencyConverter/GetCurrencies')
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
    //console.log(response)
    return response.data


}

export async function getRatesForCurrency(request) {

    const response = await axios.get('http://localhost:5203/api/CurrencyConverter/GetCurrencyRates?currentCurrency=' + request)
    // console.log(response)
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

    const response = await axios.get('http://localhost:5203/api/CurrencyConverter/GetCurrencyRatesForThreeMonths?currencies=' + request)
    return response
}

export async function getPaginatedResults(request) {

    const response = await axios.get('http://localhost:5203/api/CurrencyConverter/pagination?pageNumber=' + request)
    return response
}

export async function getUserIp() {

    const response = await axios.get('https://ipapi.co/json')
    return response
}


