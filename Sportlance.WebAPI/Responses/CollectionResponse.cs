using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sportlance.WebAPI.Responses
{
    public class CollectionResponse<T> where T: new()
    {
        public IReadOnlyCollection<T> Items { get; set; }
    }
}
