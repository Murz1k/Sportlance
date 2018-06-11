using System;
using System.Linq;
using Sportlance.DAL.Core;
using Sportlance.WebAPI.Responses;

namespace Sportlance.WebAPI.Extensions
{
    public static class PartialCollectionExtensions
    {
        public static PartialCollectionResponse<TSource> ToPartialCollectionResponse<TSource>(
            this PagingCollection<TSource> source)
            where TSource : class
        {
            return new PartialCollectionResponse<TSource>(source, source.Offset, source.TotalCount);
        }

        public static PartialCollectionResponse<TResult> ToPartialCollectionResponse<TSource, TResult>(
            this PagingCollection<TSource> source, Func<TSource, TResult> selector)
            where TResult : class
            where TSource : class
        {
            return new PartialCollectionResponse<TResult>(source.Select(selector).ToArray(), source.Offset,
                source.TotalCount);
        }
    }
}