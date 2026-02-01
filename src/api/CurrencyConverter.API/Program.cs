using CurrencyConverter.API.Endpoints;
using CurrencyConverter.BLL;
using CurrencyConverter.BLL.Service;
using CurrencyConverter.DAL;
using CurrencyConverter.API;
using Serilog;
using SerilogTracing;

var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.Seq("http://localhost:5342")
    .CreateLogger();

builder.Host.UseSerilog();


using var _ = new ActivityListenerConfiguration()
    .Instrument.AspNetCoreRequests()
    .TraceToSharedLogger();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Currency Converter API", Version = "v1" });
});

builder.Services.AddBll(); 
builder.Services.AddCurrencyConverterDAL(builder.Configuration);


builder.Services.AddRefit(builder.Configuration);

// builder.Services.AddQuartzJobs(builder.Configuration);



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000", policy =>
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod());
});




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
