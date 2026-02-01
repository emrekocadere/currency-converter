using System;
using CurrencyConverter.API.Entities;

namespace CurrencyConverter.DAL.Interfaces;

public interface INewsRepository : IRepository<News>
{
    List<News> GetNewsByPage(int pageNumber, int pageSize);
    void Addrange (List<News> news);
    bool IsNewsExist(string title);
}
