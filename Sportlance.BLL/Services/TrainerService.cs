using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sportlance.BLL.Entities;
using Sportlance.WebAPI.Entities;
using Sportlance.WebAPI.Interfaces;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;

namespace Sportlance.WebAPI.Services
{
    public class TrainerService : ITrainerService
    {
        private readonly ITrainerRepository _repository;
        private readonly ITrainingRepository _trainingRepository;
        private readonly IReviewRepository _reviewRepository;
        private readonly IUserRepository _userRepository;

        public TrainerService(
            ITrainerRepository repository,
            ITrainingRepository trainingRepository, 
            IReviewRepository reviewRepository,
            IUserRepository userRepository)
        {
            _repository = repository;
            _trainingRepository = trainingRepository;
            _reviewRepository = reviewRepository;
            _userRepository = userRepository;
        }

        public async Task<IReadOnlyCollection<Trainer>> GetTrainersBySportId(long sportId)
        {
            return await _repository.GetTrainersBySportId(sportId);
        }

        public async Task<IReadOnlyCollection<TrainerInfo>> GetTrainersInfosBySportId(long sportId)
        {
            var trainers = await _repository.GetTrainersBySportId(sportId);
            var trainerSports = await _repository.GetTrainersSportsByIds(trainers.Select(i => i.UserId));

            var mockTrainingsCounts = new List<int>()
            {
                0,
                10,
                50,
                100,
                954
            };

            var mockScores = new List<double>()
            {
                5,
                4.5,
                4,
                3.5,
                0
            };

            return trainers.Select(i => new TrainerInfo
            {
                Id = i.UserId,
                FirstName = i.FirstName,
                SecondName = i.SecondName,
                City = i.City,
                Country = i.Country,
                PhotoUrl = i.PhotoUrl,
                Price = trainerSports.First(j => j.SportId == sportId && j.TrainerId == i.UserId).Price,
                Score = mockScores[new Random().Next(0, mockScores.Count)],
                About = i.About,
                Title = i.Title,
                TrainingsCount = mockTrainingsCounts[new Random().Next(0, mockTrainingsCounts.Count)]
            }).ToArray();
        }

        public async Task<TrainerInfo> GetTrainerInfoById(long trainerId)
        {
            var trainer = await _repository.GetByIdAsync(trainerId);
            var trainerSports = await _repository.GetTrainersSportsByIds(new[] { trainer.UserId });
            var trainerTrainings = await _trainingRepository.GetByTrainerIdAsync(trainerId);
            var trainerReviews = await _reviewRepository.GetByTrainerIdAsync(trainerId);
            var allUsers = await _userRepository.GetAllAsync();
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
                FirstName = trainer.FirstName,
                SecondName = trainer.SecondName,
                City = trainer.City,
                Country = trainer.Country,
                PhotoUrl = trainer.PhotoUrl,
                Price = trainerSports.First(j => j.TrainerId == trainer.UserId).Price,
                Score = averageScore,
                About = trainer.About,
                Title = trainer.Title,
                Reviews = reviewInfos,
                TrainingsCount = trainerTrainings.Count
            };
        }
    }
}
