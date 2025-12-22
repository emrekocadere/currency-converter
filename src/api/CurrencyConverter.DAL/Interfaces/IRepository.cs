using System;

namespace CurrencyConverter.DAL.Interfaces;

public interface IRepository<T>
{
    void Add(T entity);
    void Update(T entity);
    void Delete(T entity);
    T GetById(Guid id);
    List<T> GetAll();
    int SaveChanges();

}
