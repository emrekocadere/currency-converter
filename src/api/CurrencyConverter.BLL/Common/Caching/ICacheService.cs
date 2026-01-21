namespace CurrencyConverter.BLL.Common.Caching;

public interface ICacheService
{
    T GetOrCreate<T>(string key, Func<T> createItem, TimeSpan expiration);
}