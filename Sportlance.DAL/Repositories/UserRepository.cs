using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;

namespace Sportlance.DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private AppDBContext _appContext;

        public UserRepository(AppDBContext appContext)
        {
            _appContext = appContext;
        }

        public Task<User> GetByIdAsync(long id)
            => _appContext.Users.FirstOrDefaultAsync(i=>i.Id == id);

        public Task<User> GetByEmailAsync(string email)
            => _appContext.Users.FirstOrDefaultAsync(x =>
                string.Equals(x.Email, email, StringComparison.CurrentCultureIgnoreCase));

        public Task<bool> IsEmailExistsAsync(string email)
            => _appContext.Users.AnyAsync(i => i.Email == email);

        public Task<bool> IsEmailExists(string email)
            => _appContext.Users.AnyAsync(x =>
                string.Equals(x.Email, email, StringComparison.CurrentCultureIgnoreCase));

        public Task AddAsync(User user)
            => _appContext.AddAsync(user);

        public IQueryable<User> Entities() => _appContext.Users;
        public Task SaveChangesAsync() => _appContext.SaveChangesAsync();

        public void RemoveRange(IEnumerable<User> entities)
            => _appContext.RemoveRange(entities);

        public Task AddRangeAsync(IEnumerable<User> entities)
            => _appContext.AddRangeAsync(entities);
    }
}