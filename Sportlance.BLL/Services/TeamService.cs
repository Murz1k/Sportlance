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

        public async Task<PagingCollection<TeamListItem>> GetAsync(TrainersQuery query)
        {
            var teamQuery = from team in _appContext.Teams
                where team.Status == TeamStatus.Available
                      && (query.SearchString == null || team.Title.Contains(query.SearchString)
                                                     || team.SubTitle.Contains(query.SearchString))
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


        public async Task AddAsync(long authorId)
        {
            await _appContext.AddAsync(new Team {AuthorId = authorId});
            await _appContext.SaveChangesAsync();
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

        public async Task UpdatePhotoAsync(long teamId, AzureFile photo)
        {
            var photoName = $"team-{teamId}/photo-{Guid.NewGuid()}{photo.Extension}";
            var link = await _teamsStorageProvider.UploadAndGetUriAsync(photoName, photo);
            var team = await _appContext.Teams.FirstOrDefaultAsync(i => i.Id == teamId);
            team.PhotoUrl = link;
            await _appContext.SaveChangesAsync();
        }
    }
}