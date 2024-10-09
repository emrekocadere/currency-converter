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

    public async Task<string> ConvertCurrency(ConvertCurrencyReqDTO dto)
    {

        _httpClient.DefaultRequestHeaders.Add("apikey", _configuration["ApiKey"]);
        using HttpResponseMessage response = await _httpClient.GetAsync($"https://api.apilayer.com/currency_data/convert?to={dto.ToCurrency}&from={dto.FromCurrency}&amount={dto.Amount}");
        var jsonResponse = await response.Content.ReadAsStringAsync();// ba buraya
        return jsonResponse;
    }

    public List<Currency> GetCurrencies()
    {
        return _dbContext.Currencies.ToList();
    }

    public async Task<string> GetNewsFromApi()
    {

        _httpClient.DefaultRequestHeaders.Add("apikey", _configuration["ApiKey"]);
        using HttpResponseMessage response = await _httpClient.GetAsync($"http://api.mediastack.com/v1/news?access_key={_configuration["ApiKeyMediastack"]}&categories=business&keywords=currency");
        var jsonResponse = await response.Content.ReadAsStringAsync();// ba buraya
        return jsonResponse;
    }



}
