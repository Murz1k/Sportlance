using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;

namespace Sportlance.DAL.Repositories
{
    public class TrainingRepository : EntityCrudRepository<Training>, ITrainingRepository
    {
        public TrainingRepository(IReadOnlyDataContext readContext, IEditableDataContext editContext) : base(
            readContext, editContext)
        {
        }

        public async Task<IReadOnlyCollection<Training>> GetByTrainerIdAsync(long trainerId)
        {
            return await (from training in ReadContext.Trainings
                join trainingSport in ReadContext.TrainerSports on training.TrainerSportId equals trainingSport.Id
                where trainingSport.TrainerId == trainerId
                select training).ToArrayAsync();
        }
        
        public async Task<IDictionary<long, Training[]>> GetByTrainersIdsAsync(IEnumerable<long> trainerIds)
        {
            return await (from training in ReadContext.Trainings
                join trainingSport in ReadContext.TrainerSports on training.TrainerSportId equals trainingSport.Id
                where trainerIds.Contains(trainingSport.TrainerId)
                group training by trainingSport.TrainerId into ts
                select ts).ToDictionaryAsync(k => k.Key, v => v.ToArray());
        }
    }
}