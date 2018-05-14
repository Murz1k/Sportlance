using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;

namespace Sportlance.DAL.Repositories
{
    public class UserRepository : EntityCrudRepository<User>, IUserRepository
    {
        public Task<User> GetByEmailAsync(string email) 
            => AppContext.Users.FirstOrDefaultAsync(x => string.Equals(x.Email, email, StringComparison.CurrentCultureIgnoreCase));

        public Task<bool> IsEmailExists(string email) 
            => AppContext.Users.AnyAsync(x => string.Equals(x.Email, email, StringComparison.CurrentCultureIgnoreCase));

        public async Task<User> CreateUser(User user)
        {
            await AddAsync(user);
            return user;
        }

        public UserRepository(AppDBContext appContext) : base(appContext)
        {
        }
    }
}
