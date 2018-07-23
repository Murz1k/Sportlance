﻿using System.Linq;
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
    public class TrainerService : ITrainerService
    {
        private readonly AppDBContext _appContext;
        private readonly TrainersStorageProvider _trainerStorageProvider;

        public TrainerService(AppDBContext appContext,
            TrainersStorageProvider trainerStorageProvider)
        {
            _appContext = appContext;
            _trainerStorageProvider = trainerStorageProvider;
        }

        public async Task<PagingCollection<TrainerListItem>> GetAsync(TrainersQuery query)
        {
            var collection = await (from trainer in _appContext.Trainers
                    .Include(t => t.User)
                    .Include(i => i.TrainerSports).ThenInclude(i => i.Trainings).ThenInclude(i => i.Feedback)
                    .Include(i => i.TrainerSports).ThenInclude(i => i.Sport)
                    .Include(i => i.TrainerTeams)
                where trainer.Status == TrainerStatus.Available
                      && (query.MinPrice == null || trainer.Price >= query.MinPrice.Value)
                      && (query.MaxPrice == null || trainer.Price <= query.MaxPrice.Value)
                      && (query.SearchString == null || trainer.Title.Contains(query.SearchString) ||
                          trainer.TrainerSports.Any(i => i.Sport.Name.Contains(query.SearchString)) ||
                          query.SearchString.Contains(trainer.User.FirstName) ||
                          query.SearchString.Contains(trainer.User.LastName))
                      && (query.Country == null || trainer.Country.Contains(query.Country))
                      && (query.City == null || trainer.City.Contains(query.City))
                      && (!query.FeedbacksMinCount.HasValue || query.FeedbacksMinCount <=
                          trainer.TrainerSports.SelectMany(i => i.Trainings).Count(i => i.Feedback != null))
                      && (!query.FeedbacksMaxCount.HasValue || query.FeedbacksMaxCount >=
                          trainer.TrainerSports.SelectMany(i => i.Trainings).Count(i => i.Feedback != null))
                      && (!query.TrainingsMinCount.HasValue || query.TrainingsMinCount <=
                          trainer.TrainerSports.SelectMany(i => i.Trainings).Count())
                      && (!query.TeamId.HasValue || trainer.TrainerTeams.Any(i => i.TeamId == query.TeamId))
                      && (!query.TrainingsMaxCount.HasValue || query.TrainingsMaxCount >=
                          trainer.TrainerSports.SelectMany(i => i.Trainings).Count())
                select new TrainerListItem
                {
                    Id = trainer.UserId,
                    FirstName = trainer.User.FirstName,
                    SecondName = trainer.User.LastName,
                    City = trainer.City,
                    Country = trainer.Country,
                    Price = trainer.Price,
                    Title = trainer.Title,
                    About = trainer.About,
                    Score = trainer.TrainerSports.SelectMany(i => i.Trainings).Average(f => f.Feedback.Score),
                    FeedbacksCount = trainer.TrainerSports.SelectMany(i => i.Trainings)
                        .Count(i => i.Feedback != null),
                    TrainingsCount = trainer.TrainerSports.SelectMany(i => i.Trainings).Count(),
                    Sports = trainer.TrainerSports.Select(i => i.Sport).ToArray()
                }).GetPageAsync(query.Offset, query.Count);

            return new PagingCollection<TrainerListItem>(
                await Task.WhenAll(collection.Select(AddPhotoToTrainerAsync)),
                collection.TotalCount,
                collection.Offset);
        }

        public async Task<TrainerProfile> GetById(long trainerId)
        {
            var trainer = await _appContext.Trainers
                .Include(t => t.User)
                .Include(i => i.TrainerSports).ThenInclude(i => i.Sport)
                .Include(i => i.TrainerSports).ThenInclude(i => i.Trainings).ThenInclude(i => i.Feedback)
                .Include(i => i.TrainerSports).ThenInclude(i => i.Trainings).ThenInclude(i => i.Client)
                .FirstOrDefaultAsync(i => i.UserId == trainerId);
            return new TrainerProfile
            {
                Id = trainer.UserId,
                FirstName = trainer.User.FirstName,
                SecondName = trainer.User.LastName,
                City = trainer.City,
                Country = trainer.Country,
                PhotoUrl = trainer.User.PhotoUrl,
                BackgroundUrl = trainer.BackgroundUrl,
                Price = trainer.Price,
                About = trainer.About,
                Title = trainer.Title,
                Score = trainer.TrainerSports.SelectMany(i => i.Trainings).Average(f => f.Feedback?.Score),
                Status = trainer.Status,
                Sports = trainer.TrainerSports.Select(i => i.Sport).ToArray(),
                TrainingsCount = trainer.TrainerSports.SelectMany(i => i.Trainings).Count()
            };
        }

        public async Task AddAsync(long userId)
        {
            await _appContext.AddAsync(new Trainer {UserId = userId});
            await _appContext.SaveChangesAsync();
        }

        public async Task SetAvailabilityAsync(long trainerId, TrainerStatus trainerStatus)
        {
            var trainer = await _appContext.Trainers.FirstOrDefaultAsync(i => i.UserId == trainerId);
            trainer.Status = trainerStatus;
            await _appContext.SaveChangesAsync();
        }

        public async Task UpdateAboutAsync(long trainerId, string about)
        {
            var trainer = await _appContext.Trainers.FirstOrDefaultAsync(i => i.UserId == trainerId);
            trainer.About = about;
            await _appContext.SaveChangesAsync();
        }

        public async Task UpdatePriceAsync(long trainerId, double price)
        {
            var trainer = await _appContext.Trainers.FirstOrDefaultAsync(i => i.UserId == trainerId);
            trainer.Price = price;
            await _appContext.SaveChangesAsync();
        }

        public Task<bool> CanInviteTrainer(long userId, long trainerId)
        {
            return (from team in _appContext.Teams
                where team.AuthorId == userId
                join trainerTeam in _appContext.TrainerTeams on team.Id equals trainerTeam.TeamId
                select trainerTeam).AnyAsync(i => i.TrainerId == trainerId);
        }

        public async Task UpdateMainPhotoAsync(long trainerId, AzureFile photo)
        {
            var photoName = $"trainer-{trainerId}/main";
            var link = await _trainerStorageProvider.UploadAndGetUriAsync(photoName, photo);
            var team = await _appContext.Trainers.FirstOrDefaultAsync(i => i.UserId == trainerId);
            team.User.PhotoUrl = link;
            await _appContext.SaveChangesAsync();
        }

        public async Task UpdateBackgroundImageAsync(long trainerId, AzureFile photo)
        {
            var photoName = $"trainer-{trainerId}/background";
            var link = await _trainerStorageProvider.UploadAndGetUriAsync(photoName, photo);
            var team = await _appContext.Trainers.FirstOrDefaultAsync(i => i.UserId == trainerId);
            team.BackgroundUrl = link;
            await _appContext.SaveChangesAsync();
        }

        private async Task<TrainerListItem> AddPhotoToTrainerAsync(TrainerListItem trainer)
        {
            trainer.Photo = await _trainerStorageProvider.DowndloadAsync($"trainer-{trainer.Id}/main");
            return trainer;
        }
    }
}