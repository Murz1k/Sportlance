using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.BLL.Entities;
using Sportlance.DAL.Core;
using Sportlance.WebAPI.Utilities;

namespace Sportlance.BLL.Interfaces
{
    public interface ITeamService
    {
        Task<PagingCollection<TeamListItem>> GetAsync(TeamQuery query, long? userId = null);

        Task AddAsync(long authorId, string title, string subTitle, string country, string city, string about,
            string phoneNumber, AzureFile photo);

        Task UpdateAboutAsync(long teamId, string about);

        Task<TeamProfile> GetById(long teamId);

        Task<TeamProfile> GetByAuthorId(long userId);

        Task UpdateMainPhotoAsync(long teamId, AzureFile photo);

        Task UpdateBackgroundImageAsync(long teamId, AzureFile photo);

        Task AddPhotoAsync(long teamId, AzureFile photo);

        Task<PagingCollection<TeamPhotoItem>> GetPhotosAsync(int offset, int count, long teamId);

        Task InviteMemberAsync(long teamId, long memberId);

        Task<bool> IsTeamAuthorAsync(long userId, long teamId);
    }
}