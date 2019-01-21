using Sportlance.Common.Models;

namespace Sportlance.Common.Extensions
{
    public static class PartialCollectionExtensions
    {
        public static PartialCollectionResponse<TSource> ToPartialCollectionResponse<TSource>(
            this PagingCollection<TSource> source)
            where TSource : class
        {
            return new PartialCollectionResponse<TSource>(source, source.Offset, source.TotalCount);
        }
    }
}