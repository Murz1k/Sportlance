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
        private readonly IReadOnlyDataContext _readContext;
        private readonly IEditableDataContext _editContext;

        public FeedbackRepository(IReadOnlyDataContext readContext, IEditableDataContext editContext)
        {
            _readContext = readContext;
            _editContext = editContext;
        }

        public async Task AddRangeAsync(IEnumerable<Feedback> entities)
        {
            await _editContext.Feedbacks.AddRangeAsync(entities);
            await _editContext.SaveAsync();
        }

        public async Task<IReadOnlyCollection<Feedback>> GetAllAsync()
        {
            return await _readContext.Feedbacks.ToArrayAsync();
        }

        public async Task<IReadOnlyCollection<Feedback>> GetByTrainerIdAsync(long trainerId)
        {
            return await (from review in _readContext.Feedbacks
                join training in _readContext.Trainings on review.TrainingId equals training.Id
                join trainingSport in _readContext.TrainerSports on training.TrainerSportId equals trainingSport.Id
                where trainingSport.TrainerId == trainerId
                select review).ToArrayAsync();
        }

        public async Task<IDictionary<long, Feedback[]>> GetByTrainersIdsAsync(IEnumerable<long> trainerIds)
        {
            return await (from review in _readContext.Feedbacks
                join training in _readContext.Trainings on review.TrainingId equals training.Id
                join trainingSport in _readContext.TrainerSports on training.TrainerSportId equals trainingSport.Id
                where trainerIds.Contains(trainingSport.TrainerId)
                group review by trainingSport.TrainerId into ts
                select ts).ToDictionaryAsync(k=>k.Key, v=>v.ToArray());
        }
    }
}