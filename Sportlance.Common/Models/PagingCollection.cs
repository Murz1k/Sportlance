using System.Collections.Generic;

namespace Sportlance.Common.Models
{
    public class PagingCollection<TEntity> : List<TEntity> where TEntity : class
    {
        public PagingCollection(IReadOnlyCollection<TEntity> entities, int totalCount, int offset)
        {
            AddRange(entities);
            TotalCount = totalCount;
            Offset = offset;
        }
        
        public PagingCollection(IEnumerable<TEntity> entities, int totalCount, int offset)
        {
            AddRange(entities);
            TotalCount = totalCount;
            Offset = offset;
        }

        public int TotalCount { get; }

        public int Offset { get; }
    }
}