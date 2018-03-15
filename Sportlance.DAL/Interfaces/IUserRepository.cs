using System.Threading.Tasks;
using Sportlance.DAL.Entities;

namespace Sportlance.DAL.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetByIdAsync(long id);

        Task<User> GetByEmailAsync(string email);
    }
}
