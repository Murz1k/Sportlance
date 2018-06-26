using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sportlance.DAL.Entities;

namespace Sportlance.BLL.Interfaces
{
    public interface IUserService
    {
        Task<User> GetByIdAsync(long id);

        Task<User> GetByEmailAsync(string email);

        Task<bool> IsEmailExistsAsync(string email);

        Task AddAsync(User entity);

        IQueryable<User> Entities();

        Task SaveChangesAsync();

        void RemoveRange(IEnumerable<User> entities);

        Task AddRangeAsync(IEnumerable<User> entities);
    }
}