using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;

namespace Sportlance.DAL.Repositories
{
    public class TrainingRepository : ITrainingRepository
    {
        private readonly AppDBContext _appContext;

        public TrainingRepository(AppDBContext appContext)
        {
            _appContext = appContext;
        }

        public Task AddRangeAsync(IEnumerable<Training> entities)
        => _appContext.AddRangeAsync(entities);

        public IQueryable<Training> Entities() => _appContext.Trainings;

        public async Task<IReadOnlyCollection<Training>> GetByTrainerIdAsync(long trainerId)
        {
            return await (from training in _appContext.Trainings
                join trainingSport in _appContext.TrainerSports on training.TrainerSportId equals trainingSport.Id
                where trainingSport.TrainerId == trainerId
                select training).ToArrayAsync();
        }
        
        public async Task<IDictionary<long, Training[]>> GetByTrainersIdsAsync(IEnumerable<long> trainerIds)
        {
            return await (from training in _appContext.Trainings
                join trainingSport in _appContext.TrainerSports on training.TrainerSportId equals trainingSport.Id
                where trainerIds.Contains(trainingSport.TrainerId)
                group training by trainingSport.TrainerId into ts
                select ts).ToDictionaryAsync(k => k.Key, v => v.ToArray());
        }
    }
}