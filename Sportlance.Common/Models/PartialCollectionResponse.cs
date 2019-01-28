using System.Collections.Generic;
using System.Linq;

namespace Sportlance.Common.Models
{
    public class PartialCollectionResponse<TItem> where TItem : class
    {
        public PartialCollectionResponse(IReadOnlyCollection<TItem> items, int offset, int totalCount)
        {
            Offset = offset;
            Count = items.Count;
            TotalCount = totalCount;
            Items = items;
        }

        public PartialCollectionResponse(IEnumerable<TItem> items, int offset, int totalCount)
        {
            Offset = offset;
            Items = items.ToArray();
            Count = Items.Count;
            TotalCount = totalCount;
        }

        public IReadOnlyCollection<TItem> Items { get; }

        public int Offset { get; }

        public int Count { get; }

        public int TotalCount { get; }
    }
}