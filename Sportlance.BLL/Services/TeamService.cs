using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.BLL.Entities;
using Sportlance.BLL.Interfaces;
using Sportlance.DAL.AzureStorage;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;
using Sportlance.WebAPI.Utilities;

namespace Sportlance.BLL.Services
{
    public class TeamService : ITeamService
    {
        private readonly AppDBContext _appContext;
        private readonly TeamPhotosStorageProvider _teamPhotosStorageProvider;
        private readonly TeamsStorageProvider _teamsStorageProvider;

        public TeamService(AppDBContext appContext, TeamsStorageProvider teamsStorageProvider,
            TeamPhotosStorageProvider teamPhotosStorageProvider)
        {
            _appContext = appContext;
            _teamsStorageProvider = teamsStorageProvider;
            _teamPhotosStorageProvider = teamPhotosStorageProvider;
        }

        public async Task<PagingCollection<TeamListItem>> GetAsync(TeamQuery query, long? userId = null)
        {
            var teamQuery = from team in _appContext.Teams.Include(i=>i.TrainerTeams)
                where team.Status == TeamStatus.Available
                      && (!userId.HasValue  || userId.Value == team.AuthorId || team.TrainerTeams.Any(i=>i.TrainerId == userId.Value))
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

        public async Task<PagingCollection<TeamPhotoItem>> GetPhotosAsync(int offset, int count, long teamId)
        {
            var team = await _appContext.Teams.Include(i => i.TeamPhotos).FirstOrDefaultAsync(i => i.Id == teamId);
            return new PagingCollection<TeamPhotoItem>(
                await Task.WhenAll(team.TeamPhotos.Skip(offset).Take(count).Select(async photo =>
                {
                    var item = new TeamPhotoItem
                    {
                        Id = photo.Id,
                        File = await _teamPhotosStorageProvider.DowndloadAsync($"team-{teamId}/photo-{photo.Id}")
                    };
                    return item;
                })),
                team.TeamPhotos.Count,
                offset
            );
        }


        public async Task AddAsync(long authorId,string title,string subTitle,string country,string city,string about,string phoneNumber,AzureFile photo)
        {
            var author = await _appContext.Users.FirstOrDefaultAsync(u=>u.Id == authorId);
            var roleTeam = await _appContext.Roles.FirstOrDefaultAsync(r => r.Name == "Team");
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
                _appContext.Add(new UserRole {RoleId = roleTeam.Id, UserId = authorId});
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
            team.About = about;
            await _appContext.SaveChangesAsync();
        }

        public async Task<TeamProfile> GetByAuthorId(long userId)
        {
            var team = await _appContext.Teams
                .FirstOrDefaultAsync(i => i.AuthorId == userId);
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
            var team = await _appContext.Teams
                .FirstOrDefaultAsync(i => i.Id == teamId);
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

        public async Task AddPhotoAsync(long teamId, AzureFile photo)
        {
            var team = await _appContext.Teams.FirstOrDefaultAsync(i => i.Id == teamId);
            var newPhoto = new TeamPhoto();
            team.TeamPhotos.Add(newPhoto);
            await _appContext.SaveChangesAsync();
            var photoName = $"team-{teamId}/photo-{newPhoto.Id}";
            newPhoto.PhotoUrl = await _teamPhotosStorageProvider.UploadAndGetUriAsync(photoName, photo);
            await _appContext.SaveChangesAsync();
        }

        public async Task DeletePhotoAsync(long teamId, long photoId)
        {
            var team = await _appContext.Teams.Include(i=>i.TeamPhotos).FirstOrDefaultAsync(i => i.Id == teamId);
            team.DeletePhoto(photoId);
            await _appContext.SaveChangesAsync();
            var photoName = $"team-{teamId}/photo-{photoId}";
            await _teamPhotosStorageProvider.DeleteAsync(photoName);
        }

        public async Task UpdateMainPhotoAsync(long teamId, AzureFile photo)
        {
            var photoName = $"team-{teamId}/main";
            var link = await _teamsStorageProvider.UploadAndGetUriAsync(photoName, photo);
            var team = await _appContext.Teams.FirstOrDefaultAsync(i => i.Id == teamId);
            team.PhotoUrl = link;
            await _appContext.SaveChangesAsync();
        }

        public async Task UpdateBackgroundImageAsync(long teamId, AzureFile photo)
        {
            var photoName = $"team-{teamId}/background";
            var link = await _teamsStorageProvider.UploadAndGetUriAsync(photoName, photo);
            var team = await _appContext.Teams.FirstOrDefaultAsync(i => i.Id == teamId);
            team.BackgroundUrl = link;
            await _appContext.SaveChangesAsync();
        }

        public async Task InviteMemberAsync(long teamId, long memberId)
        {
            var team = await _appContext.Teams.FirstOrDefaultAsync(i => i.Id == teamId);
            var trainer = await _appContext.Trainers.FirstOrDefaultAsync(i => i.UserId == teamId);
            
            team.TrainerTeams.Add(new TrainerTeam{Trainer = trainer});

            await _appContext.SaveChangesAsync();
        }

        public Task<bool> IsTeamAuthorAsync(long userId, long teamId)
        {
            return _appContext.Teams.AnyAsync(i => i.AuthorId == userId && i.Id == teamId);
        }
    }
}