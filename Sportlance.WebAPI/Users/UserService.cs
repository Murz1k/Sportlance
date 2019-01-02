using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Core.Errors;
using Sportlance.WebAPI.Core.Exceptions;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Users
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _appContext;

        private readonly UsersStorageProvider _usersStorageProvider;

        public UserService(AppDbContext context, UsersStorageProvider usersStorageProvider)
        {
            _appContext = context;
            _usersStorageProvider = usersStorageProvider;
        }

        public Task<User> GetByInviteLinkAsync(string inviteLink)
        {
            return Entities().FirstOrDefaultAsync(i => i.InviteLink == inviteLink);
        }

        public Task<User> GetByIdAsync(long id)
        {
            return Entities()
                .Include(i => i.UserRoles)
                .ThenInclude(i => i.Role)
                .FirstOrDefaultAsync(i => i.Id == id);
        }

        public Task<User> GetByEmailAsync(string email)
        {
            return Entities().FirstOrDefaultAsync(x =>
                string.Equals(x.Email, email, StringComparison.CurrentCultureIgnoreCase));
        }

        public Task<bool> IsEmailExistsAsync(string email)
        {
            return _appContext.Users.AnyAsync(i => i.Email == email);
        }

        public async Task AddAsync(User user)
        {
            await _appContext.AddAsync(user);
            await _appContext.SaveChangesAsync();
        }

        public IQueryable<User> Entities()
        {
            return _appContext.Users.Include(i => i.UserRoles).ThenInclude(i => i.Role);
        }

        public Task SaveChangesAsync()
        {
            return _appContext.SaveChangesAsync();
        }

        public void RemoveRange(IEnumerable<User> entities)
        {
            _appContext.RemoveRange(entities);
        }

        public Task AddRangeAsync(IEnumerable<User> entities)
        {
            return _appContext.AddRangeAsync(entities);
        }

        public Task<bool> IsEmailExists(string email)
        {
            return _appContext.Users.AnyAsync(x =>
                string.Equals(x.Email, email, StringComparison.CurrentCultureIgnoreCase));
        }

        public async Task<User> UpdateMainPhotoAsync(long userId, AzureFile photo)
        {
            var user = await _appContext.Users.FirstOrDefaultAsync(i => i.Id == userId);
            if (user == null)
            {
                throw new AppErrorException(ErrorCode.UserNotFound);
            }

            var photoName = $"user-{userId}/main";
            var link = await _usersStorageProvider.UploadAndGetUriAsync(photoName, photo);

            user.PhotoUrl = link;
            await _appContext.SaveChangesAsync();

            return user;
        }
    }
}