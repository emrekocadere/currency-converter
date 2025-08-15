using System;
using CurrencyConverter.API.Entities;

namespace CurrencyConverter.DAL.Interfaces;

public interface ICurrencyRatioRepository:IRepository<CurrencyRatio>
{
    CurrencyRatio? FindByName(string name);
}
