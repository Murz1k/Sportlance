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

        public async Task<PagingCollection<TeamListItem>> GetAsync(TeamQuery query, long? userId = null)
        {
            var teamQuery = from team in _appContext.Teams.Include(i => i.TrainerTeams)
                            where team.Status == TeamStatus.Available
                                  && (!userId.HasValue || userId.Value == team.AuthorId ||
                                      team.TrainerTeams.Any(i => i.TrainerId == userId.Value))
                                  && (query.Country == null || team.Country.Contains(query.Country))
                                  && (query.City == null || team.City.Contains(query.City))
                            select team;
            return await (from team in teamQuery
                          select new TeamListItem
                          {
                              Id = team.Id,
                              City = team.City,
                              Country = team.Country,
                              PhotoUrl = team.PhotoUrl,
                              Title = team.Title,
                              PhoneNumber = team.PhoneNumber,
                              SubTitle = team.SubTitle,
                              About = team.About
                          }).GetPageAsync(query.Offset, query.Count);
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


        public async Task AddAsync(long authorId, string title, string subTitle, string country, string city,
            string about, string phoneNumber, StorageFile photo)
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
                Country = country,
                About = about,
                PhoneNumber = phoneNumber,
                CreateDateTime = DateTime.Now,
                Status = TeamStatus.Available
            };

            if (author.UserRoles.All(i => i.RoleId != roleTeam.Id))
            {
                _appContext.Add(new UserRole { RoleId = roleTeam.Id, UserId = authorId });
            }

            _appContext.Add(newTeam);

            await _appContext.SaveChangesAsync();

            if (photo != null)
            {
                await UpdateMainPhotoAsync(newTeam.Id, photo);
            }
        }

        public async Task UpdateAboutAsync(long teamId, string about)
        {
            var team = await _appContext.Teams.FirstOrDefaultAsync(i => i.Id == teamId);
            if (team == null)
            {
                throw new AppErrorException(ErrorCode.TeamNotFound);
            }

            team.About = about;

            await _appContext.SaveChangesAsync();
        }

        public async Task<TeamProfile> GetByAuthorId(long userId)
        {
            var team = await _appContext.Teams.FirstOrDefaultAsync(i => i.AuthorId == userId);
            if (team == null)
            {
                throw new AppErrorException(ErrorCode.TeamNotFound);
            }

            return new TeamProfile
            {
                Id = team.Id,
                Title = team.Title,
                SubTitle = team.SubTitle,
                City = team.City,
                Country = team.Country,
                PhotoUrl = team.PhotoUrl,
                About = team.About,
                Status = team.Status
                //                Score = team.TrainerSports.SelectMany(i => i.Trainings).Average(f => f.Feedback?.Score),
                //                Reviews = trainer.TrainerSports.SelectMany(i => i.Trainings).Where(i => i.Feedback != null)
                //                    .OrderByDescending(i => i.Feedback.CreateDate).Select(i =>
                //                        new ReviewInfo
                //                        {
                //                            ClientName = i.Client.User.FirstName,
                //                            Score = i.Feedback.Score,
                //                            Description = i.Feedback.Description,
                //                            CreateDate = i.Feedback.CreateDate
                //                        }).ToArray(),
                //                Sports = trainer.TrainerSports.Select(i => i.Sport).ToArray(),
                //                TrainingsCount = trainer.TrainerSports.SelectMany(i => i.Trainings).Count()
            };
        }

        public async Task<TeamProfile> GetById(long teamId)
        {
            var team = await _appContext.Teams.FirstOrDefaultAsync(i => i.Id == teamId);
            if (team == null)
            {
                throw new AppErrorException(ErrorCode.TeamNotFound);
            }

            return new TeamProfile
            {
                Id = team.Id,
                Title = team.Title,
                SubTitle = team.SubTitle,
                City = team.City,
                Country = team.Country,
                PhotoUrl = team.PhotoUrl,
                About = team.About,
                PhoneNumber = team.PhoneNumber,
                Status = team.Status
                //                Score = team.TrainerSports.SelectMany(i => i.Trainings).Average(f => f.Feedback?.Score),
                //                Reviews = trainer.TrainerSports.SelectMany(i => i.Trainings).Where(i => i.Feedback != null)
                //                    .OrderByDescending(i => i.Feedback.CreateDate).Select(i =>
                //                        new ReviewInfo
                //                        {
                //                            ClientName = i.Client.User.FirstName,
                //                            Score = i.Feedback.Score,
                //                            Description = i.Feedback.Description,
                //                            CreateDate = i.Feedback.CreateDate
                //                        }).ToArray(),
                //                Sports = trainer.TrainerSports.Select(i => i.Sport).ToArray(),
                //                TrainingsCount = trainer.TrainerSports.SelectMany(i => i.Trainings).Count()
            };
        }

        public async Task AddPhotoAsync(long teamId, StorageFile photo)
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

        public async Task UpdateMainPhotoAsync(long teamId, StorageFile photo)
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
        }

        public async Task UpdateBackgroundImageAsync(long teamId, StorageFile photo)
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