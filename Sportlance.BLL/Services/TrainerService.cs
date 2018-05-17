using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.BLL.Entities;
using Sportlance.BLL.Interfaces;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;
using Sportlance.WebAPI.Entities;

namespace Sportlance.BLL.Services
{
    public class TrainerService : ITrainerService
    {
        private readonly ITrainerRepository _repository;
        private readonly ITrainingRepository _trainingRepository;
        private readonly IFeedbackRepository _feedbackRepository;
        private readonly IUserRepository _userRepository;
        private readonly IClientRepository _clientRepository;
        private readonly ITrainerSportRepository _trainerSportRepository;

        public TrainerService(
            ITrainerRepository repository,
            ITrainingRepository trainingRepository,
            IFeedbackRepository feedbackRepository,
            ITrainerSportRepository trainerSportRepository,
            IClientRepository clientRepository,
            IUserRepository userRepository)
        {
            _trainerSportRepository = trainerSportRepository;
            _repository = repository;
            _trainingRepository = trainingRepository;
            _feedbackRepository = feedbackRepository;
            _userRepository = userRepository;
            _clientRepository = clientRepository;
        }

        public async Task<IReadOnlyCollection<Trainer>> GetTrainersBySportId(long sportId)
        {
            return await _repository.GetTrainersBySportId(sportId);
        }

        public async Task<IReadOnlyCollection<TrainerInfo>> GetTrainersInfos(TrainersQuery query)
        {
            return await (from trainer in _repository.Entities().Include(t => t.User)
                join trainerSport in _trainerSportRepository.Entities() on trainer.UserId equals trainerSport.TrainerId
                join traning in _trainingRepository.Entities() on trainerSport.Id equals traning.TrainerSportId
                join feedback in _feedbackRepository.Entities().DefaultIfEmpty() on traning.Id equals feedback
                    .TrainingId
                join client in _clientRepository.Entities().Include(t => t.User) on traning.ClientId equals client
                    .UserId
                where trainer.Status == TrainerStatus.Available
                      && (query.Price == null || trainer.Price.Equals(query.Price.Value))
                group new { feedback, traning} by trainer
                into tranings
                select new TrainerInfo
                {
                    Id = tranings.Key.UserId,
                    //FirstName = tranings.Key.User.FirstName,
                    //SecondName = tranings.Key.User.LastName,
                    City = tranings.Key.City,
                    Country = tranings.Key.Country,
                    PhotoUrl = tranings.Key.PhotoUrl,
                    Price = tranings.Key.Price,
                    Score = tranings.Where(i => i.feedback != null).Average(r => r.feedback.Score),
                    About = tranings.Key.About,
                    Title = tranings.Key.Title,
                    TrainingsCount = tranings.Count()
                }).ToArrayAsync();
        }

        public async Task<TrainerInfo> GetTrainerInfoById(long trainerId)
        {
            var trainer = await _repository.GetByIdAsync(trainerId);
            var trainerTrainings = await _trainingRepository.GetByTrainerIdAsync(trainerId);
            var trainerReviews = await _feedbackRepository.GetByTrainerIdAsync(trainerId);
            var allUsers = await _userRepository.Entities().ToArrayAsync();
            var trainingsWithReview = trainerTrainings.Where(i => trainerReviews.Any(j => j.TrainingId == i.Id));

            var averageScore = trainerReviews.Average(i => i.Score);

            var reviewInfos = trainerReviews.Select(i => new ReviewInfo
            {
                CreateDate = i.CreateDate,
                Description = i.Description,
                Score = i.Score,
                ClientName = allUsers.First(j => trainingsWithReview.Any(k => k.ClientId == j.Id)).FirstName
            }).ToArray();

            return new TrainerInfo
            {
                Id = trainer.UserId,
                FirstName = trainer.User.FirstName,
                SecondName = trainer.User.LastName,
                City = trainer.City,
                Country = trainer.Country,
                PhotoUrl = trainer.PhotoUrl,
                Price = trainer.Price,
                Score = averageScore,
                About = trainer.About,
                Title = trainer.Title,
                Reviews = reviewInfos,
                TrainingsCount = trainerTrainings.Count
            };
        }

        public async Task AddAsync(long userId)
        {
            await _repository.AddAsync(new Trainer {UserId = userId});
            await _repository.SaveChangesAsync();
        }
    }
}