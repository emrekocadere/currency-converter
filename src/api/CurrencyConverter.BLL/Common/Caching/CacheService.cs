using Microsoft.Extensions.Caching.Memory;

namespace CurrencyConverter.BLL.Common.Caching;

public class CacheService(IMemoryCache cache):ICacheService
{
    public T GetOrCreate<T>(string key, Func<T> createItem, TimeSpan expiration)
    {
        if (!cache.TryGetValue(key, out T cacheEntry))
        {
            cacheEntry = createItem();

            var cacheEntryOptions = new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = expiration
            };

            cache.Set(key, cacheEntry, cacheEntryOptions);
        }
        return cacheEntry;
    }
}