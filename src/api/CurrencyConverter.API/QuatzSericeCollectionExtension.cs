using System;
using CurrencyConverter.BLL.Jobs;
using Microsoft.Extensions.Logging;
using Quartz;

namespace CurrencyConverter.API;

public static class QuartzServiceCollectionExtensions
{
    public static void AddQuartzJobs(this IServiceCollection service, IConfiguration configuration)
    {

        service.AddQuartzHostedService(options =>
        {
            options.WaitForJobsToComplete = true;
        });

        service.AddQuartz(options =>
        {
            // Quartz loglama yapılandırması
            options.UseDefaultThreadPool(tp => tp.MaxConcurrency = 10);

            options.AddJob<MediaStackNewsFetcherJob>(job => job
                .StoreDurably()
                .WithIdentity("MediaStackNewsFetcherJob"));

            // Her 8 saatte bir: 00:00, 08:00, 16:00
            options.AddTrigger(trigger => trigger
                .ForJob("MediaStackNewsFetcherJob")
                .WithIdentity("MediaStackNewsFetcherJob-trigger")
            .WithCronSchedule("0 0 0/8 * * ?",
        x => x.WithMisfireHandlingInstructionDoNothing()
    ));

            options.AddJob<RatioFetcherJob>(job => job
                .StoreDurably()
                .WithIdentity("RatioFetcherJob"));

            // Her 30 saniyede bir
            options.AddTrigger(trigger => trigger
                .ForJob("RatioFetcherJob")
                .WithIdentity("RatioFetcherJob-trigger")
                .WithCronSchedule("*/30 * * * * ?",
      x => x.WithMisfireHandlingInstructionDoNothing()));

            options.UsePersistentStore(persistenceOptions =>
            {
                persistenceOptions.UsePostgres(cfg =>
                {
                    cfg.ConnectionString = configuration.GetConnectionString("ConnectionString")!;

                    cfg.TablePrefix = "qrtz_";
                });

                persistenceOptions.UseProperties = false; // sadece string data varsa OK
                persistenceOptions.UseNewtonsoftJsonSerializer(); // complex object data varsa bu gerekli
            });
        });

    }
}
