using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.Common.Errors;
using Sportlance.Common.Exceptions;
using Sportlance.Common.Extensions;
using Sportlance.Common.Models;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Teams
{
    public class TeamsService : ITeamService
    {
        private readonly AppDbContext _appContext;
        private readonly TeamPhotosStorageProvider _teamPhotosStorageProvider;
        private readonly TeamsStorageProvider _teamsStorageProvider;

        public TeamsService(AppDbContext appContext
            , TeamsStorageProvider teamsStorageProvider,
            TeamPhotosStorageProvider teamPhotosStorageProvider
        )
        {
            _appContext = appContext;
            _teamsStorageProvider = teamsStorageProvider;
            _teamPhotosStorageProvider = teamPhotosStorageProvider;
        }

        public async Task<PagingCollection<Team>> GetAsync(TeamQuery query, long? userId = null)
        {
            var teamQuery = from team in _appContext.Teams.Include(i => i.TrainerTeams)
                            where team.Status == TeamStatus.Available
                                  && (!userId.HasValue || userId.Value == team.AuthorId ||
                                      team.TrainerTeams.Any(i => i.TrainerId == userId.Value))
                                  && (query.Country == null || team.Country.Contains(query.Country))
                                  && (query.City == null || team.City.Contains(query.City))
                            select team;
            return await (from team in teamQuery
                          select team).GetPageAsync(query.Offset, query.Count);
        }

        public async Task<bool> CanInviteTrainer(long authorId, long trainerId, long teamId)
        {
            var team = await _appContext.Teams.Include(i => i.TrainerTeams).FirstOrDefaultAsync(i => i.Id == teamId);
            if (team == null)
            {
                throw new AppErrorException(ErrorCode.TeamNotFound);
            }
            if (team.AuthorId != authorId)
            {
                throw new AppErrorException(ErrorCode.UserAccessDenied);
            }

            return !team.TrainerTeams.Any(i => i.TrainerId == trainerId);
        }

        public async Task<PagingCollection<TeamPhoto>> GetPhotosAsync(int offset, int count, long teamId)
        {
            var team = await _appContext.Teams.Include(i => i.TeamPhotos).FirstOrDefaultAsync(i => i.Id == teamId);
            if (team == null)
            {
                throw new AppErrorException(ErrorCode.TeamNotFound);
            }

            return new PagingCollection<TeamPhoto>(team.TeamPhotos.Skip(offset).Take(count),
                team.TeamPhotos.Count,
                offset
            );
        }


        public async Task<Team> AddAsync(long authorId, string title, string subTitle, string country, string city, string address,
            string about, string phoneNumber, decimal latitude, decimal longitude, short zoom, StorageFile photo = null)
        {
            var author = await _appContext.Users.FirstOrDefaultAsync(u => u.Id == authorId);
            if (author == null)
            {
                throw new AppErrorException(ErrorCode.UserNotFound);
            }

            var roleTeam = await _appContext.Roles.FirstOrDefaultAsync(r => r.Name == "Team");
            if (roleTeam == null)
            {
                throw new AppErrorException(ErrorCode.RoleNotFound);
            }

            var newTeam = new Team
            {
                AuthorId = authorId,
                Title = title,
                SubTitle = subTitle,
                City = city,
                Address = address,
                Country = country,
                About = about,
                PhoneNumber = phoneNumber,
                CreateDateTime = DateTime.Now,
                Status = TeamStatus.Available,
                Latitude = latitude,
                Longitude = longitude,
                Zoom = zoom
            };

            if (author.UserRoles.All(i => i.RoleId != roleTeam.Id))
            {
                _appContext.Add(new UserRole { RoleId = roleTeam.Id, UserId = authorId });
            }

            _appContext.Add(newTeam);

            await _appContext.SaveChangesAsync();

            if (photo != null)
            {
                newTeam = await UpdateMainPhotoAsync(newTeam.Id, photo);
            }

            return newTeam;
        }

        public async Task<Team> UpdateAboutAsync(long teamId, string about)
        {
            var team = await _appContext.Teams.FirstOrDefaultAsync(i => i.Id == teamId);
            if (team == null)
            {
                throw new AppErrorException(ErrorCode.TeamNotFound);
            }

            team.About = about;

            await _appContext.SaveChangesAsync();

            return team;
        }

        public async Task<Team> GetByAuthorId(long userId)
        {
            var team = await _appContext.Teams.FirstOrDefaultAsync(i => i.AuthorId == userId);
            if (team == null)
            {
                throw new AppErrorException(ErrorCode.TeamNotFound);
            }

            return team;
        }

        public async Task<Team> GetById(long teamId)
        {
            var team = await _appContext.Teams.FirstOrDefaultAsync(i => i.Id == teamId);
            if (team == null)
            {
                throw new AppErrorException(ErrorCode.TeamNotFound);
            }

            return team;
        }

        public async Task<TeamPhoto> AddPhotoAsync(long teamId, StorageFile photo)
        {
            var team = await _appContext.Teams.Include(i => i.TeamPhotos).FirstOrDefaultAsync(i => i.Id == teamId);
            if (team == null)
            {
                throw new AppErrorException(ErrorCode.TeamNotFound);
            }

            var newPhoto = new TeamPhoto();
            team.TeamPhotos.Add(newPhoto);

            await _appContext.SaveChangesAsync();

            var photoName = $"team-{teamId}/photo-{newPhoto.Id}";
            newPhoto.PhotoUrl = await _teamPhotosStorageProvider.UploadAndGetUriAsync(photoName, photo);

            await _appContext.SaveChangesAsync();

            return newPhoto;
        }

        public async Task DeletePhotoAsync(long teamId, long photoId)
        {
            var team = await _appContext.Teams.Include(i => i.TeamPhotos).FirstOrDefaultAsync(i => i.Id == teamId);
            if (team == null)
            {
                throw new AppErrorException(ErrorCode.TeamNotFound);
            }

            var photo = team.TeamPhotos.FirstOrDefault(i => i.Id == photoId);
            team.TeamPhotos.Remove(photo);

            await _appContext.SaveChangesAsync();

            var photoName = $"team-{teamId}/photo-{photoId}";
            await _teamPhotosStorageProvider.DeleteAsync(photoName);
        }

        public async Task<Team> UpdateMainPhotoAsync(long teamId, StorageFile photo)
        {
            var team = await _appContext.Teams.FirstOrDefaultAsync(i => i.Id == teamId);
            if (team == null)
            {
                throw new AppErrorException(ErrorCode.TeamNotFound);
            }

            var photoName = $"team-{teamId}/main";
            var link = await _teamsStorageProvider.UploadAndGetUriAsync(photoName, photo);

            team.PhotoUrl = link;

            await _appContext.SaveChangesAsync();

            return team;
        }

        public async Task<Team> UpdateBackgroundImageAsync(long teamId, StorageFile photo)
        {
            var team = await _appContext.Teams.FirstOrDefaultAsync(i => i.Id == teamId);
            if (team == null)
            {
                throw new AppErrorException(ErrorCode.TeamNotFound);
            }

            var photoName = $"team-{teamId}/background";
            var link = await _teamsStorageProvider.UploadAndGetUriAsync(photoName, photo);

            team.BackgroundUrl = link;

            await _appContext.SaveChangesAsync();

            return team;
        }

        public async Task InviteMemberAsync(long teamId, long memberId)
        {
            var team = await _appContext.Teams.Include(i => i.TrainerTeams).FirstOrDefaultAsync(i => i.Id == teamId);
            if (team == null)
            {
                throw new AppErrorException(ErrorCode.TeamNotFound);
            }

            var trainer = await _appContext.Trainers.FirstOrDefaultAsync(i => i.UserId == memberId);
            if (trainer == null)
            {
                throw new AppErrorException(ErrorCode.TrainerNotFound);
            }

            team.TrainerTeams.Add(new TrainerTeam { Trainer = trainer });

            await _appContext.SaveChangesAsync();
        }

        public async Task<bool> IsTeamAuthorAsync(long userId, long teamId)
        {
            var team = await _appContext.Teams.FirstOrDefaultAsync(i => i.Id == teamId);
            if (team == null)
            {
                throw new AppErrorException(ErrorCode.TeamNotFound);
            }

            return team.AuthorId == userId;
        }

        public async Task<IEnumerable<TeamService>> GetServicesAsync(long teamId)
        {
            var team = await _appContext.Teams.Include(i => i.Services).FirstOrDefaultAsync(i => i.Id == teamId);
            if (team == null)
            {
                throw new AppErrorException(ErrorCode.TeamNotFound);
            }

            return team.Services.Where(i=>!i.IsDeleted);
        }

        public async Task<TeamService> GetServiceByIdAsync(long teamId, long serviceId)
        {
            var team = await _appContext.Teams.Include(i => i.Services).FirstOrDefaultAsync(i => i.Id == teamId);
            if (team == null)
            {
                throw new AppErrorException(ErrorCode.TeamNotFound);
            }

            var service = team.Services.FirstOrDefault(i => i.Id == serviceId);
            if (service == null)
            {
                throw new AppErrorException(ErrorCode.TeamServiceNotFound);
            }

            return service;
        }

        public async Task<TeamService> AddServiceAsync(long teamId, string name, string description, string duration, long price)
        {
            if (name == null || name == string.Empty)
            {
                throw new AppErrorException(ErrorCode.NameIsRequired);
            }

            if (duration == string.Empty)
            {
                throw new AppErrorException(ErrorCode.DurationIsRequired);
            }

            if (price <= 0)
            {
                throw new AppErrorException(ErrorCode.PriceMustBeGreaterThanZero);
            }

            var team = await _appContext.Teams.Include(i => i.Services).FirstOrDefaultAsync(i => i.Id == teamId);
            if (team == null)
            {
                throw new AppErrorException(ErrorCode.TeamNotFound);
            }

            var newService = new TeamService
            {
                Description = description,
                Duration = duration,
                Name = name,
                Price = price
            };

            team.Services.Add(newService);

            await _appContext.SaveChangesAsync();

            return newService;
        }

        public async Task<TeamService> UpdateServiceAsync(long teamId, long serviceId, string name, string description, string duration, long price)
        {
            if (name == string.Empty)
            {
                throw new AppErrorException(ErrorCode.NameIsRequired);
            }

            if (duration == string.Empty)
            {
                throw new AppErrorException(ErrorCode.DurationIsRequired);
            }

            if (price < 0)
            {
                throw new AppErrorException(ErrorCode.PriceMustBeGreaterThanZero);
            }

            var team = await _appContext.Teams.Include(i => i.Services).FirstOrDefaultAsync(i => i.Id == teamId);
            if (team == null)
            {
                throw new AppErrorException(ErrorCode.TeamNotFound);
            }

            var service = team.Services.FirstOrDefault(i => i.Id == serviceId);
            if (service == null)
            {
                throw new AppErrorException(ErrorCode.TeamServiceNotFound);
            }

            service.Description = description;
            service.Duration = duration;
            service.Name = name;
            service.Price = price;

            await _appContext.SaveChangesAsync();

            return service;
        }

        public async Task DeleteServiceAsync(long teamId, long serviceId)
        {
            var team = await _appContext.Teams.Include(i => i.Services).FirstOrDefaultAsync(i => i.Id == teamId);
            if (team == null)
            {
                throw new AppErrorException(ErrorCode.TeamNotFound);
            }

            var service = team.Services.FirstOrDefault(i => i.Id == serviceId);
            if (service == null)
            {
                throw new AppErrorException(ErrorCode.TeamServiceNotFound);
            }

            if (service.IsDeleted)
            {
                throw new AppErrorException(ErrorCode.TeamServiceAlreadyDeleted);
            }

            service.IsDeleted = true;

            await _appContext.SaveChangesAsync();
        }
    }
}