using System.Collections.Generic;

namespace Sportlance.WebAPI.Responses
{
    public class CollectionResponse<T> where T : new()
    {
        public IReadOnlyCollection<T> Items { get; set; }
    }
}