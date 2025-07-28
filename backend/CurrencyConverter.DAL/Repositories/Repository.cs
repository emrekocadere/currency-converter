using System;
using Microsoft.EntityFrameworkCore;

namespace CurrencyConverter.DAL;

public class Repository<T>: IRepository<T> where T : class
{
    protected readonly CurrencyConverterDbContext _context;
    private readonly DbSet<T> _dbSet;

    public Repository(CurrencyConverterDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }

    public void Add(T entity)
    {
        _dbSet.Add(entity);
    }

    public void Update(T entity)
    {
        // Update logic here
    }

    public void Delete(T entity)
    {
        _dbSet.Remove(entity);
    }

    public T GetById(Guid id)
    {
        // Get by ID logic here
        return default!;
    }

    public IEnumerable<T> GetAll()
    {
        return _dbSet;
    }
}
