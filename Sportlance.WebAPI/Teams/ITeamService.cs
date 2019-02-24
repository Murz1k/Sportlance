using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.Common.Models;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Teams
{
    public interface ITeamService
    {
        Task<PagingCollection<Team>> GetAsync(TeamQuery query, long? userId = null);

        Task<Team> AddAsync(long authorId, string title, string subTitle, string country, string city, string address, string about,
            string phoneNumber, string latitude, string longitude, short zoom, StorageFile photo);

        Task<Team> UpdateAboutAsync(long teamId, string about);

        Task<Team> UpdateAddressAsync(long teamId, string country, string city, string address, string latitude, string longitude, short zoom);

        Task<Team> GetById(long teamId);

        Task<Team> GetByAuthorId(long userId);

        Task<Team> UpdateMainPhotoAsync(long teamId, StorageFile photo);

        Task<Team> UpdateBackgroundImageAsync(long teamId, StorageFile photo);
        
        Task<PagingCollection<TeamPhoto>> GetPhotosAsync(int offset, int count, long teamId);

        Task<TeamPhoto> AddPhotoAsync(long teamId, StorageFile photo);

        Task DeletePhotoAsync(long teamId, long photoId);

        Task<bool> CanInviteTrainer(long authorId, long trainerId, long teamId);

        Task InviteMemberAsync(long teamId, long memberId);

        Task<bool> IsTeamAuthorAsync(long userId, long teamId);

        #region Services
        Task<IEnumerable<TeamService>> GetServicesAsync(long teamId);

        Task<TeamService> GetServiceByIdAsync(long teamId, long serviceId);

        Task<TeamService> AddServiceAsync(long teamId, string name, string description, string duration, long price);

        Task<TeamService> UpdateServiceAsync(long teamId, long serviceId, string name, string description, string duration, long price);

        Task DeleteServiceAsync(long teamId, long serviceId);
        #endregion
    }
}