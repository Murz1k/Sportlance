using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.Common.Models;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Trainers
{
    public interface ITrainersService
    {
        Task<PagingCollection<Trainer>> GetAsync(TrainersQuery query);

        Task<Trainer> GetByIdAsync(long trainerId);

        Task<TrainerWorkExperience[]> GetWorkExperienceByTrainerId(long trainerId);

        Task<ICollection<TrainerWorkExperience>> UpdateWorkExperienceByTrainerId(long trainerId, IList<TrainerWorkExperience> workExperiences);

        Task<Trainer> AddAsync(User user);
        
        Task<Trainer> SetAvailabilityAsync(long trainerId, TrainerStatus trainerStatus);

        Task<Trainer> UpdateSkillsAsync(long trainerId, IList<Sport> skills);

        Task<Trainer> UpdateAboutAsync(long trainerId, string about);

        Task<Trainer> UpdateBackgroundImageAsync(long trainerId, StorageFile photo);

        Task<Trainer> UpdatePriceAsync(long trainerId, double price);

        Task<IReadOnlyCollection<Training>> GetTrainingsAsync(long trainerId, DateTimeOffset fromDate,
            DateTimeOffset toDate);

        Task<Training> AddTrainingAsync(long trainerId, long clientId, long sportId, DateTimeOffset fromDate);
    }
}