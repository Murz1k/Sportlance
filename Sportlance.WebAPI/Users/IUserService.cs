using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sportlance.Common.Models;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Users
{
    public interface IUserService
    {
        Task<User> GetByIdAsync(long id);

        Task<User> GetByInviteLinkAsync(string inviteLink);

        Task<User> GetByEmailAsync(string email);

        Task<bool> IsEmailExistsAsync(string email);

        Task AddAsync(User entity);

        Task<User> UpdateMainPhotoAsync(long userId, StorageFile photo);

        IQueryable<User> Entities();

        Task SaveChangesAsync();

        void RemoveRange(IEnumerable<User> entities);

        Task AddRangeAsync(IEnumerable<User> entities);
    }
}