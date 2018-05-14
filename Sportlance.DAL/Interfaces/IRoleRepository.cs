using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.DAL.Entities;

namespace Sportlance.DAL.Interfaces
{
    public interface IRoleRepository
    {
        Task<IEnumerable<Role>> GetAllAsync();

        Task<IReadOnlyCollection<Role>> GetRolesByUserId(long userId);
    }
}