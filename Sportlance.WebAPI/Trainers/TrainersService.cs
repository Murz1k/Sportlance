using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.Common.Errors;
using Sportlance.Common.Exceptions;
using Sportlance.Common.Extensions;
using Sportlance.Common.Models;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Trainers
{
    public class TrainersService : ITrainersService
    {
        private readonly AppDbContext _appContext;
        private readonly TrainersStorageProvider _trainerStorageProvider;

        public TrainersService(AppDbContext appContext
            , TrainersStorageProvider trainerStorageProvider
        )
        {
            _appContext = appContext;
            _trainerStorageProvider = trainerStorageProvider;
        }

        private Task<Trainer> GetTrainerWithIncludesById(long trainerId)
        {
            return _appContext.Trainers
                .Include(t => t.User)
                .Include(i => i.TrainerSports)
                .ThenInclude(i => i.Sport)
                .FirstOrDefaultAsync(i => i.UserId == trainerId);
        }

        public async Task<TrainerWorkExperience[]> GetWorkExperienceByTrainerId(long trainerId)
        {
            var trainer = await GetTrainerWithIncludesById(trainerId);

            if (trainer == null)
            {
                throw new AppErrorException(ErrorCode.TrainerNotFound);
            }

            return await (from exp in _appContext.TrainerWorkExperience.Include(i => i.Skills).ThenInclude(i => i.Sport)
                          where exp.TrainerId == trainerId
                          select exp).ToArrayAsync();
        }

        public async Task<ICollection<TrainerWorkExperience>> UpdateWorkExperienceByTrainerId(long trainerId, IList<TrainerWorkExperience> workExperiences)
        {
            var trainer = await _appContext.Trainers.Include(i => i.WorkExperience)
                                                    .ThenInclude(i => i.Skills)
                                                    .ThenInclude(i => i.Sport)
                                                    .FirstOrDefaultAsync(i => i.UserId == trainerId);

            if (trainer == null)
            {
                throw new AppErrorException(ErrorCode.TrainerNotFound);
            }

            for (int i = 0; i < workExperiences.Count; i++)
            {
                if (workExperiences[i].Id == default(long))
                {
                    trainer.WorkExperience.Add(workExperiences[i]);
                }
                else
                {
                    var existExperience = trainer.WorkExperience.FirstOrDefault(j => j.Id == workExperiences[i].Id);
                    existExperience.Company = workExperiences[i].Company;
                    existExperience.Description = workExperiences[i].Description;
                    existExperience.FromDate = workExperiences[i].FromDate;
                    existExperience.Position = workExperiences[i].Position;
                    existExperience.ToDate = workExperiences[i].ToDate;
                }
            }
            // Удалить все существующие навыки, которых нет в новых
            var deletes = trainer.WorkExperience.Where(i => !workExperiences.Any(j => j.Id == i.Id)).ToArray();

            foreach (var item in deletes)
            {
                trainer.WorkExperience.Remove(item);
            }

            await _appContext.SaveChangesAsync();

            return trainer.WorkExperience;
        }

        private double CalculateYearsCount(DateTime d1, DateTime? d2)
        {
            double months;

            if (!d2.HasValue)
            {
                d2 = new DateTime();
            }

            months = (d2.Value.Year - d1.Year) * 12;
            months -= d1.Month + 1;
            months += d2.Value.Month + 1;

            return months <= 0 ? 0 : months / 12;
        }


        public async Task<PagingCollection<Trainer>> GetAsync(TrainersQuery query)
        {
            var collection = await (from trainer in _appContext.Trainers
                    .Include(t => t.User)
                                        //.Include(i => i.TrainerSports).ThenInclude(i => i.Trainings).ThenInclude(i => i.Feedback)
                                        .Include(i => i.TrainerSports).ThenInclude(i => i.Sport)
                                        .Include(i => i.WorkExperience)
                                        //.Include(i => i.TrainerTeams)
                                    where trainer.Status == TrainerStatus.Available
                                          && (query.MinPrice == null || trainer.Price >= query.MinPrice.Value)
                                          && (query.MaxPrice == null || trainer.Price <= query.MaxPrice.Value)
                                          && (query.Search == null || trainer.Title.ToLower().Contains(query.Search.ToLower()) ||
                                              trainer.TrainerSports.Any(i => i.Sport.Name.ToLower().Contains(query.Search.ToLower())) ||
                                              trainer.User.FirstName.ToLower().Contains(query.Search.ToLower()) ||
                                              trainer.User.LastName.ToLower().Contains(query.Search.ToLower()))
                                          && (query.Country == null || trainer.Country.Contains(query.Country))
                                          && (query.City == null || trainer.City.Contains(query.City))
                                          && (query.WorkExperienceFrom == null || trainer.WorkExperience.Sum(i => CalculateYearsCount(i.FromDate, i.ToDate)) >= query.WorkExperienceFrom)
                                          && (query.WorkExperienceTo == null || trainer.WorkExperience.Sum(i => CalculateYearsCount(i.FromDate, i.ToDate)) <= query.WorkExperienceTo)
                                    //&& (!query.FeedbacksMinCount.HasValue || query.FeedbacksMinCount <=
                                    //    trainer.TrainerSports.SelectMany(i => i.Trainings).Count(i => i.Feedback != null))
                                    //&& (!query.FeedbacksMaxCount.HasValue || query.FeedbacksMaxCount >=
                                    //    trainer.TrainerSports.SelectMany(i => i.Trainings).Count(i => i.Feedback != null))
                                    //&& (!query.TrainingsMinCount.HasValue || query.TrainingsMinCount <=
                                    //    trainer.TrainerSports.SelectMany(i => i.Trainings).Count())
                                    //&& (!query.TeamId.HasValue || trainer.TrainerTeams.Any(i => i.TeamId == query.TeamId))
                                    //&& (!query.TrainingsMaxCount.HasValue || query.TrainingsMaxCount >=
                                    //    trainer.TrainerSports.SelectMany(i => i.Trainings).Count())
                                    select trainer
                //select new TrainerListItem
                //{
                //    Id = trainer.UserId,
                //    FirstName = trainer.User.FirstName,
                //    SecondName = trainer.User.LastName,
                //    City = trainer.City,
                //    Country = trainer.Country,
                //    Price = trainer.Price,
                //    Title = trainer.Title,
                //    About = trainer.About,
                //    PhotoUrl = trainer.User.PhotoUrl,
                //    Score = trainer.TrainerSports.SelectMany(i => i.Trainings).Average(f => f.Feedback.Score),
                //    FeedbacksCount = trainer.TrainerSports.SelectMany(i => i.Trainings)
                //        .Count(i => i.Feedback != null),
                //    TrainingsCount = trainer.TrainerSports.SelectMany(i => i.Trainings).Count(),
                //    Sports = trainer.TrainerSports.Select(i => i.Sport).ToArray()
                //}
                ).GetPageAsync(query.Offset, query.Count);

            return new PagingCollection<Trainer>(collection, collection.TotalCount,
                collection.Offset);
        }

        public async Task<Trainer> GetByIdAsync(long trainerId)
        {
            var trainer = await GetTrainerWithIncludesById(trainerId);

            if (trainer == null)
            {
                throw new AppErrorException(ErrorCode.TrainerNotFound);
            }

            return trainer;


            //    new TrainerProfile
            //{
            //    Id = trainer.UserId,
            //    FirstName = trainer.User.FirstName,
            //    SecondName = trainer.User.LastName,
            //    City = trainer.City,
            //    Country = trainer.Country,
            //    PhotoUrl = trainer.User.PhotoUrl,
            //    BackgroundUrl = trainer.BackgroundUrl,
            //    Price = trainer.Price,
            //    About = trainer.About,
            //    Title = trainer.Title,
            //    //Score = trainer.TrainerSports.SelectMany(i => i.Trainings).Average(f => f.Feedback?.Score),
            //    Status = trainer.Status,
            //    //Sports = trainer.TrainerSports.Select(i => i.Sport).ToArray(),
            //    //TrainingsCount = trainer.TrainerSports.SelectMany(i => i.Trainings).Count()
            //};
        }

        public async Task<Trainer> AddAsync(User user)
        {
            var role = await _appContext.Roles.FirstOrDefaultAsync(i => i.Name == "Trainer");
            if (role == null)
            {
                throw new AppErrorException(ErrorCode.RoleNotFound);
            }

            if (user.HasRoleRole(role))
            {
                throw new AppErrorException(ErrorCode.UserAlreadyHasRole);
            }

            user.AddRole(role);

            var newTrainer = new Trainer { UserId = user.Id };

            _appContext.Add(newTrainer);

            await _appContext.SaveChangesAsync();

            return newTrainer;
        }

        public async Task<Trainer> SetAvailabilityAsync(long trainerId, TrainerStatus trainerStatus)
        {
            var trainer = await GetTrainerWithIncludesById(trainerId);

            if (trainer == null)
            {
                throw new AppErrorException(ErrorCode.TrainerNotFound);
            }

            trainer.Status = trainerStatus;

            await _appContext.SaveChangesAsync();

            return trainer;
        }

        public async Task<Trainer> UpdateSkillsAsync(long trainerId, IList<Sport> skills)
        {
            var trainer = await GetTrainerWithIncludesById(trainerId);

            if (trainer == null)
            {
                throw new AppErrorException(ErrorCode.TrainerNotFound);
            }

            for (int i = 0; i < skills.Count; i++)
            {
                // Если у тренера уже есть такой навык
                if (trainer.TrainerSports.Any(j => j.SportId == skills[i].Id))
                {
                    continue;
                }
                else // Если навык новый
                {
                    if (skills[i].Id == default(long))
                    {
                        skills[i] = new Sport { Name = skills[i].Name };

                        await _appContext.Sports.AddAsync(skills[i]);

                        await _appContext.SaveChangesAsync();
                    }

                    trainer.TrainerSports.Add(new TrainerSport { TrainerId = trainerId, SportId = skills[i].Id });
                }
            }
            // Удалить все существующие навыки, которых нет в новых
            var deletes = trainer.TrainerSports.Where(i => !skills.Any(j => j.Id == i.SportId)).ToArray();

            foreach (var sport in deletes)
            {
                trainer.TrainerSports.Remove(sport);
            }

            await _appContext.SaveChangesAsync();

            return trainer;
        }

        public async Task<Trainer> UpdateAboutAsync(long trainerId, string about)
        {
            var trainer = await GetTrainerWithIncludesById(trainerId);

            if (trainer == null)
            {
                throw new AppErrorException(ErrorCode.TrainerNotFound);
            }

            trainer.About = about;

            await _appContext.SaveChangesAsync();

            return trainer;
        }

        public async Task<Trainer> UpdatePriceAsync(long trainerId, double price)
        {
            var trainer = await GetTrainerWithIncludesById(trainerId);

            if (trainer == null)
            {
                throw new AppErrorException(ErrorCode.TrainerNotFound);
            }

            trainer.Price = price;

            await _appContext.SaveChangesAsync();

            return trainer;
        }

        public async Task<Trainer> UpdateBackgroundImageAsync(long trainerId, StorageFile photo)
        {
            var trainer = await GetTrainerWithIncludesById(trainerId);

            if (trainer == null)
            {
                throw new AppErrorException(ErrorCode.TrainerNotFound);
            }

            var photoName = $"trainer-{trainerId}/background";
            var link = await _trainerStorageProvider.UploadAndGetUriAsync(photoName, photo);

            trainer.BackgroundUrl = link;

            await _appContext.SaveChangesAsync();

            return trainer;
        }

        public async Task<IReadOnlyCollection<Training>> GetTrainingsAsync(long trainerId, DateTimeOffset fromDate,
            DateTimeOffset toDate)
        {
            return await (from trainer in _appContext.Trainers
                          where trainer.UserId == trainerId
                          join trainingSport in _appContext.TrainerSports on trainer.UserId equals trainingSport.TrainerId
                          join training in _appContext.Trainings.Include(i => i.Client).Include(i => i.TrainerSport)
                                  .ThenInclude(i => i.Sport)
                              on trainingSport.Id equals training.TrainerSportId
                          where training.StartDate >= fromDate
                                && (!training.EndDate.HasValue || training.EndDate.Value <= toDate)
                          select training).ToArrayAsync();
        }

        public async Task<Training> AddTrainingAsync(long trainerId, long clientId, long sportId, DateTimeOffset fromDate)
        {
            var trainerSport = await _appContext.TrainerSports.FirstOrDefaultAsync(i =>
                i.TrainerId == trainerId && i.SportId == sportId);

            var newTraining = new Training
            {
                ClientId = clientId,
                StartDate = fromDate.DateTime,
                TrainerSportId = trainerSport.Id
            };

            _appContext.Trainings.Add(newTraining);

            await _appContext.SaveChangesAsync();

            return newTraining;
        }
    }
}