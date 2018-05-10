using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public TrainerService(
            ITrainerRepository repository,
            ITrainingRepository trainingRepository,
            IFeedbackRepository feedbackRepository,
            IUserRepository userRepository)
        {
            _repository = repository;
            _trainingRepository = trainingRepository;
            _feedbackRepository = feedbackRepository;
            _userRepository = userRepository;
        }

        public async Task<IReadOnlyCollection<Trainer>> GetTrainersBySportId(long sportId)
        {
            return await _repository.GetTrainersBySportId(sportId);
        }

        public async Task<IReadOnlyCollection<TrainerInfo>> GetTrainersInfosBySportId(long sportId)
        {
            var trainers = await _repository.GetTrainersBySportId(sportId);

            var trainersTrainings = await _trainingRepository.GetByTrainersIdsAsync(trainers.Select(i => i.UserId));

            var trainerReviews = await _feedbackRepository.GetByTrainersIdsAsync(trainers.Select(i => i.UserId));

            return trainers.Where(i => i.Status == TrainerStatus.Available).Select(i => new TrainerInfo
            {
                Id = i.UserId,
                FirstName = i.User.FirstName,
                SecondName = i.User.LastName,
                City = i.City,
                Country = i.Country,
                PhotoUrl = i.PhotoUrl,
                Price = i.Price,
                Score = trainerReviews.ContainsKey(i.UserId) ? trainerReviews[i.UserId].Average(s => s.Score) : null,
                About = i.About,
                Title = i.Title,
                TrainingsCount = trainersTrainings.ContainsKey(i.UserId) ? trainersTrainings[i.UserId].Length : 0
            }).ToArray();
        }

        public async Task<TrainerInfo> GetTrainerInfoById(long trainerId)
        {
            var trainer = await _repository.GetByIdAsync(trainerId);
            var trainerTrainings = await _trainingRepository.GetByTrainerIdAsync(trainerId);
            var trainerReviews = await _feedbackRepository.GetByTrainerIdAsync(trainerId);
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
            await _repository.SaveChanges();
        }
    }
}