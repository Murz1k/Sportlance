using Sportlance.DAL.Core;

namespace Sportlance.DAL.Entities
{
    public class Role: IEntityWithId
    {
        public long Id { get; set; }

        public string Name { get; set; }
    }
}
