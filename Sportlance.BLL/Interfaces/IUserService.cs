using System.Threading.Tasks;
using Sportlance.DAL.Entities;

namespace Sportlance.BLL.Interfaces
{
    public interface IUserService
    {
        Task<User> GetAsync(long id);
    }
}