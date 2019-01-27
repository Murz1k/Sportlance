using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.Common.Models;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Trainers
{
    public interface ITrainersService
    {
        Task<PagingCollection<TrainerListItem>> GetAsync(TrainersQuery query);

        Task<TrainerProfile> GetById(long trainerId);

        Task<User> AddAsync(User user);
        
        Task SetAvailabilityAsync(long trainerId, TrainerStatus trainerStatus);

        Task UpdateAboutAsync(long trainerId, string about);

        Task UpdateBackgroundImageAsync(long trainerId, StorageFile photo);

        Task UpdatePriceAsync(long trainerId, double price);

        Task<IReadOnlyCollection<TraningItem>> GetTrainingsAsync(long trainerId, DateTimeOffset fromDate,
            DateTimeOffset toDate);

        Task AddTrainingAsync(long trainerId, long clientId, long sportId, DateTimeOffset fromDate);
    }
}