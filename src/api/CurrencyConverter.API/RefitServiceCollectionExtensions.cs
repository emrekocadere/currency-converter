using CurrencyConverter.BLL;
using Refit;

namespace CurrencyConverter.API;

public static class RefitServiceCollectionExtensions
{
    public static void AddRefit(this IServiceCollection service, IConfiguration configuration)
    {
        service
            .AddRefitClient<IFixerAPi>()
            .ConfigureHttpClient(c => c.BaseAddress = new Uri(configuration["ApiUrls:FixerApiUrl"]!));


        service
            .AddRefitClient<IRatingApi>()
            .ConfigureHttpClient(c => c.BaseAddress = new Uri(configuration["ApiUrls:Ekrem"]!));

        service
            .AddRefitClient<IMediastackApi>()
            .ConfigureHttpClient(c => c.BaseAddress = new Uri(configuration["ApiUrls:MediastackApiUrl"]!));

        // service
        //     .AddRefitClient<ICurrencyDataApi>()
        //     .ConfigureHttpClient(c => c.BaseAddress = new Uri(builder.Configuration["ApiUrls:CurrencyDataApiUrl"]!));
    }
}