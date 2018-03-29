using System;
using System.Threading.Tasks;
using Sportlance.BLL.Interfaces;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;

namespace Sportlance.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }

        public Task<User> GetAsync(long id)
            => _repository.GetByIdAsync(id);
    }
}
