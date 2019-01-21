using System.Collections.Generic;

namespace Sportlance.Common.Models
{
    public class CollectionResponse<T> where T : new()
    {
        public IReadOnlyCollection<T> Items { get; set; }
    }
}