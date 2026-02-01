using System;
using CurrencyConverter.API.Entities;
using CurrencyConverter.DAL.Interfaces;

namespace CurrencyConverter.DAL.Repositories;

public class NewsRepository:Repository<News>, INewsRepository
{
    public NewsRepository(CurrencyConverterDbContext context) : base(context)
    {
    }

    public void Addrange(List<News> news)
    {
        _context.News.AddRange(news);
    }

    public bool IsNewsExist(string title)
    {
        return _context.News.Any(n => n.Title == title);
    }

    public List<News> GetNewsByPage(int pageNumber,int pageSize)
    {
      return  _context.News.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
    }


}

