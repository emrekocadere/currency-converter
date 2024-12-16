using System;
using System.Text.Json;
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
        var jsonResponse = await response.Content.ReadAsStringAsync();// bak buraya
        return jsonResponse;
    }

    public List<Currency> GetCurrencies()
    {
        return _dbContext.Currencies.ToList();
    }

    public void SaveTheNewsToDb(List<News>news)
    {
         _dbContext.News.AddRange(news);
         _dbContext.SaveChanges();
    }


    public List<News> GetNewsFromDb()
    {
        return _dbContext.News.ToList();
    }

    public async Task<string> GetCurrencyRates(GetCurrencyRatesDTO dto)
    {
        var todayDate = DateTime.Today.ToString("yyyy-MM-dd");
        var pastDate = DateTime.Today.AddMonths(-2).ToString("yyyy-MM-dd");

        _httpClient.DefaultRequestHeaders.Add("apikey", _configuration["ApiKey"]);
        using HttpResponseMessage response = await _httpClient.GetAsync($"https://api.apilayer.com/exchangerates_data/timeseries?start_date={pastDate}&end_date={todayDate}&base={dto.FromCurrency}&symbols={dto.ToCurrency}");
        var jsonResponse = await response.Content.ReadAsStringAsync();// bak buraya

        return jsonResponse;
    }


    public async Task<List<GetCommonCurrenciesResponseDTO>> GetCommonCurrencies()
    {
        string[,] currencies = new string[3, 4];
        currencies[0, 0] = "EUR";
        currencies[0, 1] = "JPY";
        currencies[0, 2] = "USD";
        currencies[0, 3] = "GBP";

        currencies[1, 0] = "GBP";
        currencies[1, 1] = "EUR";
        currencies[1, 2] = "JPY";
        currencies[1, 3] = "USD";

        currencies[2, 0] = "USD";
        currencies[2, 1] = "EUR";
        currencies[2, 2] = "JPY";
        currencies[2, 3] = "GBP";

        var getCommonCurrenciesResponseDTOList=new List<GetCommonCurrenciesResponseDTO>();

        _httpClient.DefaultRequestHeaders.Add("apikey", _configuration["ApiKey"]);
        for (int i = 0; i < 3; i++)
        {
              HttpResponseMessage response = await _httpClient.GetAsync($"https://api.apilayer.com/fixer/latest?symbols={currencies[i,1]}%2C{currencies[i,2]}%2C{currencies[i,3]}&base={currencies[i,0]}");
              var jsonResponse = await response.Content.ReadAsStringAsync();
              var getCommonCurrenciesResponseDTO = JsonSerializer.Deserialize<GetCommonCurrenciesResponseDTO>(jsonResponse);
              getCommonCurrenciesResponseDTOList.Add(getCommonCurrenciesResponseDTO);
        }

        return getCommonCurrenciesResponseDTOList;
    }






}
