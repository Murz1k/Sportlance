using System.Collections.Generic;

namespace Sportlance.WebAPI.Core
{
    public class CollectionResponse<T> where T : new()
    {
        public IReadOnlyCollection<T> Items { get; set; }
    }
}