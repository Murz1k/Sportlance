namespace Sportlance.WebAPI.Core.Extensions
{
    public static class PartialCollectionExtensions
    {
        public static PartialCollectionResponse<TSource> ToPartialCollectionResponse<TSource>(
            this Core.PagingCollection<TSource> source)
            where TSource : class
        {
            return new PartialCollectionResponse<TSource>(source, source.Offset, source.TotalCount);
        }
    }
}