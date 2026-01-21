using System;
using CurrencyConverter.DAL.Entities;

namespace CurrencyConverter.DAL.Interfaces;

public interface IRateFetchHistoryRepository:IRepository<CurrencyRateFetchHistory>
{
    CurrencyRateFetchHistory?  GetLastRecordDate();
}
