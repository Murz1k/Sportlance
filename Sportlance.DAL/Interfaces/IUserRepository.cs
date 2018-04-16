using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Sportlance.DAL.Entities;

namespace Sportlance.DAL.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetByIdAsync(long id);

        Task<User> GetByEmailAsync(string email);

        Task<int> UpdateAsync(User entity, params Expression<Func<User, object>>[] properties);

        Task<int> UpdateWholeAsync(User entity);

        Task<bool> IsEmailExists(string email);

        Task<User> CreateUser(User entity);

        Task<int> RemoveRangeAsync(IEnumerable<User> entities);

        Task<int> AddRangeAsync(IEnumerable<User> entities);

        Task<IReadOnlyCollection<User>> GetAllAsync();
    }
}
