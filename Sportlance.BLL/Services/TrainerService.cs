using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sportlance.WebAPI.Entities;
using Sportlance.WebAPI.Interfaces;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;

namespace Sportlance.WebAPI.Services
{
    public class TrainerService : ITrainerService
    {
        private readonly ITrainerRepository _repository;

        public TrainerService(ITrainerRepository repository)
        {
            _repository = repository;
        }

        public async Task<IReadOnlyCollection<Trainer>> GetTrainersBySportId(long sportId)
        {
            return await _repository.GetTrainersBySportId(sportId);
        }

        public async Task<IReadOnlyCollection<TrainerInfo>> GetTrainersInfosBySportId(long sportId)
        {
            var trainers = await _repository.GetTrainersBySportId(sportId);
            var trainerSports = await _repository.GetTrainersSportsByIds(trainers.Select(i => i.Id));

            var mockTrainingsCounts = new List<uint>()
            {
                0,
                10,
                50,
                100,
                954
            };

            var mockReviewCounts = new List<uint>()
            {
                0,
                21,
                254,
                14,
                211
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
                Id = i.Id,
                FirstName = i.FirstName,
                SecondName = i.SecondName,
                City = i.City,
                Country = i.Country,
                PhotoUrl = i.PhotoUrl,
                Price = trainerSports.First(j => j.SportId == sportId && j.TrainerId == i.Id).Price,
                Score = mockScores[new Random().Next(0, mockScores.Count)],
                About = i.About,
                Title = i.Title,
                ReviewCount = mockReviewCounts[new Random().Next(0, mockReviewCounts.Count)],
                TrainingsCount = mockTrainingsCounts[new Random().Next(0, mockTrainingsCounts.Count)]
            }).ToArray();
        }

        public async Task<TrainerInfo> GetTrainerInfoById(long trainerId)
        {
            var trainer = await _repository.GetByIdAsync(trainerId);
            var trainerSports = await _repository.GetTrainersSportsByIds(new[] { trainer.Id });

            var mockTrainingsCounts = new List<uint>()
            {
                0,
                10,
                50,
                100,
                954
            };

            var mockReviewCounts = new List<uint>()
            {
                0,
                21,
                254,
                14,
                211
            };

            var mockScores = new List<double>()
            {
                5,
                4.5,
                4,
                3.5,
                0
            };

            return new TrainerInfo
            {
                Id = trainer.Id,
                FirstName = trainer.FirstName,
                SecondName = trainer.SecondName,
                City = trainer.City,
                Country = trainer.Country,
                PhotoUrl = trainer.PhotoUrl,
                Price = trainerSports.First(j => j.TrainerId == trainer.Id).Price,
                Score = mockScores[new Random().Next(0, mockScores.Count)],
                About = trainer.About,
                Title = trainer.Title,
                ReviewCount = mockReviewCounts[new Random().Next(0, mockReviewCounts.Count)],
                TrainingsCount = mockTrainingsCounts[new Random().Next(0, mockTrainingsCounts.Count)]
            };
        }
    }
}
