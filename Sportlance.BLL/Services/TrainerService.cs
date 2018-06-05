using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.BLL.Entities;
using Sportlance.BLL.Interfaces;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;

namespace Sportlance.BLL.Services
{
    public class TrainerService : ITrainerService
    {
        private readonly AppDBContext _appContext;

        public TrainerService(AppDBContext appContext)
        {
            _appContext = appContext;
        }

        public async Task<IReadOnlyCollection<TrainerListItem>> GetAsync(TrainersQuery query)
        {
            var trainingsCount = await (from trainerSport in _appContext.TrainerSports
                join traning in _appContext.Trainings on trainerSport.Id equals traning.TrainerSportId
                group traning by trainerSport.TrainerId
                into counts
                select counts).ToDictionaryAsync(k => k.Key, v => v.Count());

            var feedbacks = await (from trainerSport in _appContext.TrainerSports
                join traning in _appContext.Trainings on trainerSport.Id equals traning.TrainerSportId
                join feedback in _appContext.Feedbacks.DefaultIfEmpty() on traning.Id equals feedback.TrainingId
                join client in _appContext.Clients.Include(t => t.User) on traning.ClientId equals client.UserId
                group feedback by trainerSport.TrainerId
                into counts
                select counts).ToDictionaryAsync(k => k.Key, v => v.Select(i => i).ToList());

            var trainerItems = await (from trainer in _appContext.Trainers.Include(t => t.User)
                where trainer.Status == TrainerStatus.Available
                      && (query.MinPrice == null || trainer.Price >= query.MinPrice.Value)
                      && (query.MaxPrice == null || trainer.Price <= query.MaxPrice.Value)
                      && (query.SearchString == null || trainer.Title.Contains(query.SearchString) ||
                          query.SearchString.Contains(trainer.User.FirstName) ||
                          query.SearchString.Contains(trainer.User.LastName))
                select new TrainerListItem
                {
                    Id = trainer.UserId,
                    FirstName = trainer.User.FirstName,
                    SecondName = trainer.User.LastName,
                    City = trainer.City,
                    Country = trainer.Country,
                    PhotoUrl = trainer.PhotoUrl,
                    Price = trainer.Price,
                    Title = trainer.Title
                }).ToArrayAsync();

            foreach (var trainer in trainerItems)
            {
                trainer.Score = feedbacks.ContainsKey(trainer.Id) ? feedbacks[trainer.Id].Average(f => f.Score) : null;
                trainer.FeedbacksCount = feedbacks.ContainsKey(trainer.Id) ? feedbacks[trainer.Id].Count : 0;
                trainer.TrainingsCount = trainingsCount.ContainsKey(trainer.Id) ? trainingsCount[trainer.Id] : 0;
            }

            return trainerItems
                .Where(i =>
                    (!query.FeedbacksMinCount.HasValue || query.FeedbacksMinCount <= i.FeedbacksCount)
                    && (!query.FeedbacksMaxCount.HasValue || query.FeedbacksMaxCount >= i.FeedbacksCount)
                    && (!query.TrainingsMinCount.HasValue || query.TrainingsMinCount <= i.TrainingsCount)
                    && (!query.TrainingsMaxCount.HasValue || query.TrainingsMaxCount >= i.TrainingsCount)
                ).ToArray();
        }

        public async Task<TrainerProfile> GetById(long trainerId)
        {
            var trainer = await _appContext.Trainers.Include(i => i.User)
                .FirstOrDefaultAsync(i => i.UserId == trainerId);

            var trainingsCount = await (from trainerSport in _appContext.TrainerSports
                join traning in _appContext.Trainings on trainerSport.Id equals traning.TrainerSportId
                where trainerSport.TrainerId == trainerId
                select traning).CountAsync();

            var feedbacks = await (from trainerSport in _appContext.TrainerSports
                join traning in _appContext.Trainings on trainerSport.Id equals traning.TrainerSportId
                join feedback in _appContext.Feedbacks.DefaultIfEmpty() on traning.Id equals feedback.TrainingId
                join client in _appContext.Clients.Include(t => t.User) on traning.ClientId equals client.UserId
                where trainerSport.TrainerId == trainerId
                select new ReviewInfo
                {
                    ClientName = client.User.FirstName,
                    Score = feedback.Score,
                    Description = feedback.Description,
                    CreateDate = feedback.CreateDate
                }).ToArrayAsync();

            return new TrainerProfile
            {
                Id = trainer.UserId,
                FirstName = trainer.User.FirstName,
                SecondName = trainer.User.LastName,
                City = trainer.City,
                Country = trainer.Country,
                PhotoUrl = trainer.PhotoUrl,
                Price = trainer.Price,
                Score = feedbacks.Average(r => r.Score),
                About = trainer.About,
                Title = trainer.Title,
                Reviews = feedbacks,
                TrainingsCount = trainingsCount
            };
        }

        public async Task AddAsync(long userId)
        {
            await _appContext.AddAsync(new Trainer {UserId = userId});
            await _appContext.SaveChangesAsync();
        }
    }
}