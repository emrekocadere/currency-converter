using System;

namespace CurrencyConverter.DAL;

public interface IRepository<T>
{
    void Add(T entity);
    void Update(T entity);
    void Delete(T entity);
    T GetById(Guid id);
    IEnumerable<T> GetAll();
}
