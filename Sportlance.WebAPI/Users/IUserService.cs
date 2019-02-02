using System.Linq;
using System.Threading.Tasks;
using Sportlance.Common.Models;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Users
{
    public interface IUserService
    {
        Task<User> GetByIdAsync(long id);

        Task<User> GetByInviteLinkAsync(string inviteLink);

        Task<User> GetByEmailAsync(string email);

        Task<bool> IsEmailExistsAsync(string email);

        Task<User> AddAsync(User entity);

        Task<User> UpdateMainPhotoAsync(long userId, StorageFile photo);

        IQueryable<User> Entities();

        Task SaveChangesAsync();
    }
}