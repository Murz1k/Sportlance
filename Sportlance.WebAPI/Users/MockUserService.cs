using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Users
{
    public class MockUserService : IUserService
    {
        private readonly List<User> _users;

        public MockUserService()
        {
            _users = new List<User>();
        }

        public Task<User> GetByIdAsync(long id)
        {
            return new Task<User>(() => _users.FirstOrDefault(i => i.Id == id));
        }

        public Task<User> GetByInviteLinkAsync(string inviteLink)
        {
            throw new System.NotImplementedException();
        }

        public Task<User> GetByEmailAsync(string email)
        {
            return new Task<User>(() => _users.FirstOrDefault(i => i.Email == email));
        }

        public Task<bool> IsEmailExistsAsync(string email)
        {
            return new Task<bool>(() => _users.Any(i => i.Email == email));
        }

        public Task AddAsync(User entity)
        {
            return new Task(() => _users.Add(entity));
        }

        public Task<User> UpdateMainPhotoAsync(long trainerId, AzureFile photo)
        {
            throw new System.NotImplementedException();
        }

        public IQueryable<User> Entities()
        {
            return _users.AsQueryable();
        }

        public Task SaveChangesAsync()
        {
            return Task.CompletedTask;
        }

        public void RemoveRange(IEnumerable<User> entities)
        {
            _users.RemoveAll(i => entities.Contains(i));
        }

        public Task AddRangeAsync(IEnumerable<User> entities)
        {
            return new Task(() => _users.AddRange(entities));
        }
    }
}