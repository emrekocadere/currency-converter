using System;

namespace CurrencyConverter.API;

public class CurrencyConverterService
{
    readonly private HttpClient _httpClient;
    readonly private IConfiguration _configuration; 
    public CurrencyConverterService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<string> SendRequest()
    {
          
            _httpClient.DefaultRequestHeaders.Add("apikey", _configuration["ApiKey"]); 
            using HttpResponseMessage response = await _httpClient.GetAsync("https://api.apilayer.com/currency_data/convert?to=eur&from=try&amount=100");
            var jsonResponse = await response.Content.ReadAsStringAsync();
            return jsonResponse;

     }
 
}
