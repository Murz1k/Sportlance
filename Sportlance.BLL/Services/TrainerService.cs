using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;
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

        public async Task<PagingCollection<TrainerListItem>> GetAsync(TrainersQuery query)
        {
            var trainerQuery = from trainer in _appContext.Trainers
                    .Include(t => t.User)
                    .Include(i => i.TrainerSports)
                    .ThenInclude(i => i.Trainings)
                where trainer.Status == TrainerStatus.Available
                      && (query.MinPrice == null || trainer.Price >= query.MinPrice.Value)
                      && (query.MaxPrice == null || trainer.Price <= query.MaxPrice.Value)
                      && (query.SearchString == null || trainer.Title.Contains(query.SearchString) ||
                          query.SearchString.Contains(trainer.User.FirstName) ||
                          query.SearchString.Contains(trainer.User.LastName))
                      && (!query.FeedbacksMinCount.HasValue || query.FeedbacksMinCount <= trainer.TrainerSports.SelectMany(i => i.Trainings).Count(i => i.Feedback != null))
                      && (!query.FeedbacksMaxCount.HasValue || query.FeedbacksMaxCount >= trainer.TrainerSports.SelectMany(i => i.Trainings).Count(i => i.Feedback != null))
                      && (!query.TrainingsMinCount.HasValue || query.TrainingsMinCount <=
                          trainer.TrainerSports.SelectMany(i => i.Trainings).Count())
                      && (!query.TrainingsMaxCount.HasValue || query.TrainingsMaxCount >=
                          trainer.TrainerSports.SelectMany(i => i.Trainings).Count())
                select trainer;

            return await (from trainer in trainerQuery
                select new TrainerListItem
                {
                    Id = trainer.UserId,
                    FirstName = trainer.User.FirstName,
                    SecondName = trainer.User.LastName,
                    City = trainer.City,
                    Country = trainer.Country,
                    PhotoUrl = trainer.PhotoUrl,
                    Price = trainer.Price,
                    Title = trainer.Title,
                    Score = trainer.TrainerSports.SelectMany(i => i.Trainings).Average(f => f.Feedback.Score),
                    FeedbacksCount = trainer.TrainerSports.SelectMany(i => i.Trainings)
                        .Count(i => i.Feedback != null),
                    TrainingsCount = trainer.TrainerSports.SelectMany(i => i.Trainings).Count()
                }).GetPageAsync(query.Offset, query.Count);
        }

        public async Task<TrainerProfile> GetById(long trainerId)
        {
            var trainer = await _appContext.Trainers
                .Include(t => t.User)
                .Include(i => i.TrainerSports).ThenInclude(i => i.Trainings).ThenInclude(i=>i.Feedback)
                .Include(i=>i.TrainerSports).ThenInclude(i => i.Trainings).ThenInclude(i=>i.Client).ThenInclude(i=>i.User)
                .FirstOrDefaultAsync(i => i.UserId == trainerId);

            return new TrainerProfile
            {
                Id = trainer.UserId,
                FirstName = trainer.User.FirstName,
                SecondName = trainer.User.LastName,
                City = trainer.City,
                Country = trainer.Country,
                PhotoUrl = trainer.PhotoUrl,
                Price = trainer.Price,
                About = trainer.About,
                Title = trainer.Title,
                Score = trainer.TrainerSports.SelectMany(i => i.Trainings).Average(f => f.Feedback.Score),
                Reviews = trainer.TrainerSports.SelectMany(i => i.Trainings).Select(i => new ReviewInfo
                {
                    ClientName = i.Client.User.FirstName,
                    Score = i.Feedback.Score,
                    Description = i.Feedback.Description,
                    CreateDate = i.Feedback.CreateDate
                }).ToArray(),
                TrainingsCount = trainer.TrainerSports.SelectMany(i => i.Trainings).Count()
            };
        }

        public async Task AddAsync(long userId)
        {
            await _appContext.AddAsync(new Trainer {UserId = userId});
            await _appContext.SaveChangesAsync();
        }
    }
}