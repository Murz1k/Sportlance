﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.Common.Models;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Teams
{
    public interface ITeamService
    {
        Task<PagingCollection<TeamListItem>> GetAsync(TeamQuery query, long? userId = null);

        Task AddAsync(long authorId, string title, string subTitle, string country, string city, string about,
            string phoneNumber, StorageFile photo);

        Task UpdateAboutAsync(long teamId, string about);

        Task<TeamProfile> GetById(long teamId);

        Task<TeamProfile> GetByAuthorId(long userId);

        Task UpdateMainPhotoAsync(long teamId, StorageFile photo);

        Task UpdateBackgroundImageAsync(long teamId, StorageFile photo);

        Task AddPhotoAsync(long teamId, StorageFile photo);

        Task DeletePhotoAsync(long teamId, long photoId);

        Task<bool> CanInviteTrainer(long authorId, long trainerId, long teamId);

        Task<PagingCollection<TeamPhoto>> GetPhotosAsync(int offset, int count, long teamId);

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