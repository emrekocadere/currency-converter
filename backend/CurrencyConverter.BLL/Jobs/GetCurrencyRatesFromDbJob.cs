using System;
using Quartz;

namespace CurrencyConverter.API.Jobs;

public class GetCurrencyRatesFromDbJob : IJob
{
    private readonly CurrencyConverterService _service;
    public GetCurrencyRatesFromDbJob(CurrencyConverterService service)
    {
        _service=service;
    }
    public Task Execute(IJobExecutionContext context)
    {
        _service.GetCurrencyRatesFromDb();
        return Task.CompletedTask;
    }
}
