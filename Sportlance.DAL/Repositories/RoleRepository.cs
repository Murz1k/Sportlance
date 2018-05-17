using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;

namespace Sportlance.DAL.Repositories
{
    public class RoleRepository: IRoleRepository
    {
        private readonly AppDBContext _appContext;

        public RoleRepository(AppDBContext appContext)
        {
            _appContext = appContext;
        }

        public async Task<IReadOnlyCollection<Role>> GetRolesByUserId(long userId)
        {
            return await (from role in _appContext.Roles
                join userRole in _appContext.UserRoles on role.Id equals userRole.RoleId
                where userRole.UserId == userId
                select role).ToArrayAsync();
        }
    }
}