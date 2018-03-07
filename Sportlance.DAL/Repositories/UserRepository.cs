using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;

namespace Sportlance.DAL.Repositories
{
    public class UserRepository : EntityCrudRepository<User>
    {
        public UserRepository(IReadOnlyDataContext readContext, IEditableDataContext editContext)
            : base(readContext, editContext)
        {
        }
    }
}
