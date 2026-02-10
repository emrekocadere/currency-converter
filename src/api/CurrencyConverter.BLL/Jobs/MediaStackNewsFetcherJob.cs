using CurrencyConverter.API.Entities;
using CurrencyConverter.BLL;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Quartz;
using CurrencyConverter.BLL.Service;
using CurrencyConverter.DAL.Interfaces;

namespace CurrencyConverter.BLL.Jobs;

public class MediaStackNewsFetcherJob(
    INewsRepository newsRepository,
    IMediastackApi mediastackApi,
    HttpClient httpClient,
    IConfiguration configuration,
    CurrencyConverterService currencyConverterService,
    ILogger<MediaStackNewsFetcherJob> logger)
    : IJob
{
    private readonly HttpClient _httpClient = httpClient;

    public async Task Execute(IJobExecutionContext context)
    {
        try
        {
            logger.LogInformation("[{JobName}] Job started. Time: {ExecutionTime}", "MediaStackNewsFetcherJob", DateTime.Now);


            var newsList=new List<News>();
            
            var mediastackResponse = await mediastackApi.GetNewsAsync(new GetNewsQueryParams
            {
                access_key = configuration["ApiKey:Mediastack"]!,
                date = DateTime.Now.ToString("yyyy-MM-dd"),
                categories = "business,-sports,-science",
                languages = "en",
                keywords = "currency,finance,economy,market,investment",
                limit = 100
            });

            foreach(var data in mediastackResponse.data!)
            {
                var isExist =  newsRepository.IsNewsExist(data.Title);
                if(data.Image != null || !isExist)
                {
                    newsList.Add(data);
                }
                else
                    continue;
            }
            currencyConverterService.SaveTheNewsToDb(newsList);
            
            logger.LogInformation("[{JobName}] Job completed successfully. {NewsCount} news items saved. Time: {ExecutionTime}", "MediaStackNewsFetcherJob", newsList.Count, DateTime.Now);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "[{JobName}] An error occurred while executing the job. Time: {ExecutionTime}", "MediaStackNewsFetcherJob", DateTime.Now);
            throw;
        }
    }
}
