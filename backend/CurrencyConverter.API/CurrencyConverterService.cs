using System;
using CurrencyConverter.API.DTOs;
using CurrencyConverter.API.Entities;

namespace CurrencyConverter.API;

public class CurrencyConverterService
{
    readonly private HttpClient _httpClient;
    readonly private IConfiguration _configuration; 
    readonly private CurrencyConverterDbContext _dbContext;
    public CurrencyConverterService(HttpClient httpClient, IConfiguration configuration, CurrencyConverterDbContext dbContext)
    {
        _httpClient = httpClient;
        _configuration = configuration;
        _dbContext = dbContext;
    }

    public async Task<string> SendRequest(ExchangeReqDTO dto)
    {
          
            _httpClient.DefaultRequestHeaders.Add("apikey", _configuration["ApiKey"]); 
            using HttpResponseMessage response = await _httpClient.GetAsync("https://api.apilayer.com/currency_data/convert?to=eur&from=try&amount=100");
            var jsonResponse = await response.Content.ReadAsStringAsync();
            return jsonResponse;
     }


 
}
