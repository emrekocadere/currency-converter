import axios from 'axios';



export function ConvertCurrency(requestbody) {

    axios.post('http://localhost:5203/api/CurrencyConverter/ConvertCurrency',
        requestbody)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function GetNewsFromDb() {

    axios.get('http://localhost:5203/api/CurrencyConverter/GetNewsFromDb')
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}






