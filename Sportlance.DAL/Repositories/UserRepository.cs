using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;

namespace Sportlance.DAL.Repositories
{
    public class UserRepository : EntityCrudRepository<User>, IUserRepository
    {
        public UserRepository(IReadOnlyDataContext readContext, IEditableDataContext editContext)
            : base(readContext, editContext)
        {
        }

        public Task<User> GetByEmailAsync(string email) 
            => ReadContext.Users.FirstOrDefaultAsync(i => i.Email.Equals(email));

        public Task<bool> IsEmailExists(string email) => ReadContext.Users.AnyAsync(x => x.Email == email);

        public async Task<User> CreateUser(User user)
        {
            await AddAsync(user);
            return user;
        }
    }
}
