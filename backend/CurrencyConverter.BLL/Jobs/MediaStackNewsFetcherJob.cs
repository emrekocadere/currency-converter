using System;
using System.Text.Json;
using CurrencyConverter.API.Entities;
using Quartz;

namespace CurrencyConverter.API;

public class MediaStackNewsFetcherJob : IJob
{
    readonly private HttpClient _httpClient;
    readonly private IConfiguration _configuration;
    readonly private CurrencyConverterService _currencyConverterService;
    public MediaStackNewsFetcherJob(HttpClient httpClient,IConfiguration configuration,CurrencyConverterService currencyConverterService){
        _httpClient=httpClient;
        _configuration=configuration;
        _currencyConverterService=currencyConverterService;
    }
    public async Task Execute(IJobExecutionContext context)
    {
        
        using HttpResponseMessage response = await _httpClient.GetAsync($"http://api.mediastack.com/v1/news?access_key={_configuration["ApiKeyMediastack"]}&limit=100&languages=en&categories=business");
        var jsonResponse = await response.Content.ReadAsStringAsync();
        var mediastackResponse = JsonSerializer.Deserialize<MediastackResponse>(jsonResponse);
        var newsList=new List<News>();
        foreach(var data in mediastackResponse.data)
        {
            if(data.image!=null)
            {
                newsList.Add(data);
            }
        }
        _currencyConverterService.SaveTheNewsToDb(newsList);


    }
}
