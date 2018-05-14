using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;

namespace Sportlance.DAL.Repositories
{
    public class RoleRepository : EntityCrudRepository<Role>, IRoleRepository
    {
        public RoleRepository(AppDBContext appContext) : base(appContext)
        {
        }

        public async Task<IReadOnlyCollection<Role>> GetRolesByUserId(long userId)
        {
            return await (from role in AppContext.Roles
                join userRole in AppContext.UserRoles on role.Id equals userRole.RoleId
                where userRole.UserId == userId
                select role).ToArrayAsync();
        }
    }
}