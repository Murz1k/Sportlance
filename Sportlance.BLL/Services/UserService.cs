using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.BLL.Interfaces;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;

namespace Sportlance.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly AppDBContext _context;

        public UserService(AppDBContext context)
        {
            _context = context;
        }

        public Task<User> GetAsync(long id)
        {
            return _context.Users.FirstOrDefaultAsync(i => i.Id == id);
        }
    }
}