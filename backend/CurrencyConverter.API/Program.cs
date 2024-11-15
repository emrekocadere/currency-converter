using CurrencyConverter.API;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // İzin verilen URL
              .AllowAnyHeader() // Herhangi bir header'a izin ver
              .AllowAnyMethod(); // Herhangi bir HTTP metoduna izin ver
    });
});

builder.Services.AddHttpClient<CurrencyConverterService>();
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
builder.Services.AddScoped<CurrencyConverterService>();

var connString=builder.Configuration.GetConnectionString("ConnectionString");

builder.Services.AddDbContext<CurrencyConverterDbContext>(builder=>builder.UseSqlServer(connString));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowLocalhost3000");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
