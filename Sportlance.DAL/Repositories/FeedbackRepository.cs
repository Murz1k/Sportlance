using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;

namespace Sportlance.DAL.Repositories
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly AppDBContext _appContext;

        public FeedbackRepository(AppDBContext appContext)
        {
            _appContext = appContext;
        }

        public Task AddRangeAsync(IEnumerable<Feedback> entities)
            => _appContext.Feedbacks.AddRangeAsync(entities);

        public IQueryable<Feedback> Entities() => _appContext.Feedbacks;

        public async Task<IReadOnlyCollection<Feedback>> GetByTrainerIdAsync(long trainerId)
        {
            return await (from review in _appContext.Feedbacks
                join training in _appContext.Trainings on review.TrainingId equals training.Id
                join trainingSport in _appContext.TrainerSports on training.TrainerSportId equals trainingSport.Id
                where trainingSport.TrainerId == trainerId
                select review).ToArrayAsync();
        }

        public async Task<IDictionary<long, Feedback[]>> GetByTrainersIdsAsync(IEnumerable<long> trainerIds)
        {
            return await (from review in _appContext.Feedbacks
                join training in _appContext.Trainings on review.TrainingId equals training.Id
                join trainingSport in _appContext.TrainerSports on training.TrainerSportId equals trainingSport.Id
                where trainerIds.Contains(trainingSport.TrainerId)
                group review by trainingSport.TrainerId into ts
                select ts).ToDictionaryAsync(k=>k.Key, v=>v.ToArray());
        }
    }
}