import axios from 'axios';



// export function ConvertCurrency(requestbody) {
// console.log("sdfsd")
//     axios.post('http://localhost:5203/api/CurrencyConverter/ConvertCurrency',
//         requestbody)
//         .then(function (response) {
//             console.log(response);


//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }



export async function ConvertCurrencyAsync(requestbody) {
    
    console.log(requestbody)
    const response = await axios.post('http://localhost:5203/api/CurrencyConverter/ConvertCurrency', requestbody)
    return response
}


export async function GetNewsFromDb() {

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



export async function GetCurrenciesAsync() {

    const response =await axios.get('http://localhost:5203/api/CurrencyConverter/GetCurrencies')
    console.log(response)
    return response.data
}

// export  function GetCurrencies() {

//     const response = axios.get('http://localhost:5203/api/CurrencyConverter/GetCurrencies')
//     console.log(response)
//     return response
// }//Promise {<pending>}




export async function GetConvertCurrencyRatesAsync(requestbody) {

    const response =await axios.post('http://localhost:5203/api/CurrencyConverter/GetConvertCurrencyRates',requestbody)
    console.log(response)
    return response.data
}

export async function GetCommonCurrenciesRatesAsync() {

    const response =await axios.get('http://localhost:5203/api/CurrencyConverter/GetCommonCurrencies')
    console.log(response)
    return response.data
}