using CurrencyConverter.API.Endpoints;
using CurrencyConverter.BLL;
using CurrencyConverter.BLL.Service;
using CurrencyConverter.DAL;
using Refit;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Currency Converter API", Version = "v1" });
});

builder.Services.AddBll(); 
builder.Services.AddCurrencyConverterDAL(builder.Configuration);



// builder.Services.AddQuartzHostedService(options =>
// {
//     options.WaitForJobsToComplete = true;
// });


// builder.Services.AddQuartz(options =>
// {
//     options.AddJob<MediaStackNewsFetcherJob>(job => job
//         .StoreDurably()
//         .WithIdentity("MediaStackNewsFetcherJob"));

//     options.AddTrigger(trigger => trigger
//         .ForJob("MediaStackNewsFetcherJob")
//         .WithIdentity("MediaStackNewsFetcherJob-trigger")
//         .StartNow()
//         .WithSimpleSchedule(x => x
//             .WithInterval(TimeSpan.FromMinutes(450))
//             .RepeatForever()));

//     options.UsePersistentStore(persistenceOptions =>
//     {
//         persistenceOptions.UsePostgres(cfg =>
//         {
//             cfg.ConnectionString = "User ID=ubuntu_db_admin;Password=admin;Host=3.73.248.105;Port=5432;Database=CurrencyConverterDB;";

//             cfg.TablePrefix = "qrtz_";
//         });

//         persistenceOptions.UseProperties = false; // sadece string data varsa OK
//         persistenceOptions.UseNewtonsoftJsonSerializer(); // complex object data varsa bu gerekli
//     });
// });

// builder.Services
//     .AddRefitClient<IMediastackApi>()
//     .ConfigureHttpClient(c => c.BaseAddress = new Uri(builder.Configuration["ApiUrls:MediastackApiUrl"]!));

//     builder.Services
//     .AddRefitClient<ICurrencyDataApi>()
//     .ConfigureHttpClient(c => c.BaseAddress = new Uri(builder.Configuration["ApiUrls:CurrencyDataApiUrl"]!));
    
    builder.Services
    .AddRefitClient<IFixerAPi>()
    .ConfigureHttpClient(c => c.BaseAddress = new Uri(builder.Configuration["ApiUrls:FixerApiUrl"]!));


        builder.Services
    .AddRefitClient<IRatingApi>()
    .ConfigureHttpClient(c => c.BaseAddress = new Uri(builder.Configuration["ApiUrls:Ekrem"]!));

// Log.Logger = new LoggerConfiguration()
//             .WriteTo.Console()
//             .WriteTo.Seq(builder.Configuration["Seq:Url"]!,apiKey:builder.Configuration["Seq:ApiKey"])
//             .CreateLogger();


//         using var _ = new ActivityListenerConfiguration()
//             .Instrument.AspNetCoreRequests()
//             .TraceToSharedLogger();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000", policy =>
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod());
});


// builder.Services.AddQuartz(configure =>
// {
//     var jobKey = new JobKey("GetNewsFromMediastack");
//     configure
//         .AddJob<MediaStackNewsFetcherJob>(jobKey)
//         .AddTrigger(
//             trigger => trigger.ForJob(jobKey).WithSimpleSchedule(
//                 schedule => schedule.WithIntervalInHours(12).RepeatForever()));

//     var jobKey2 = new JobKey("GetCurrencyRates");
//     configure
//         .AddJob<CurrencyRatesFetcherJob>(jobKey2)
//         .AddTrigger(
//             trigger => trigger.ForJob(jobKey2).WithSimpleSchedule(
//                 schedule => schedule.WithIntervalInHours(12).RepeatForever()));

// });


builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

builder.Services.AddScoped<ICurrencyConverterService, CurrencyConverterService>();



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowLocalhost3000");
app.UseHttpsRedirection();

app.MapCurrencyConverterEndpoints();



app.Run();
