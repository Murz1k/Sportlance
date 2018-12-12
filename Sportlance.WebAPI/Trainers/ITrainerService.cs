﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Trainers
{
    public interface ITrainerService
    {
        Task<PagingCollection<TrainerListItem>> GetAsync(TrainersQuery query);

        Task<TrainerProfile> GetById(long trainerId);

        Task<User> AddAsync(User user);
        
        Task SetAvailabilityAsync(long trainerId, TrainerStatus trainerStatus);

        Task UpdateAboutAsync(long trainerId, string about);

        Task UpdateBackgroundImageAsync(long trainerId, AzureFile photo);

        Task UpdatePriceAsync(long trainerId, double price);

        Task<bool> CanInviteTrainer(long userId, long trainerId);

        Task<IReadOnlyCollection<TraningItem>> GetTrainingsAsync(long trainerId, DateTimeOffset fromDate,
            DateTimeOffset toDate);

        Task AddTrainingAsync(long trainerId, long clientId, long sportId, DateTimeOffset fromDate);
    }
}