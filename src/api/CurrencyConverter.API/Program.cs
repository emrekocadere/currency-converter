using CurrencyConverter.API.Endpoints;
using CurrencyConverter.BLL;
using CurrencyConverter.BLL.Service;
using CurrencyConverter.DAL;
using CurrencyConverter.API;
using Refit;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Currency Converter API", Version = "v1" });
});

builder.Services.AddBll(); 
builder.Services.AddCurrencyConverterDAL(builder.Configuration);


builder.Services.AddRefit(builder.Configuration);

builder.Services.AddQuartzJobs(builder.Configuration);
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
