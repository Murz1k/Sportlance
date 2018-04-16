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
        public TrainingRepository(IReadOnlyDataContext readContext, IEditableDataContext editContext) : base(readContext, editContext)
        {
        }

        public async Task<IReadOnlyCollection<Training>> GetByTrainerIdAsync(long trainerId)
        {
            return await (from training in ReadContext.Trainings
                join trainer in ReadContext.Trainers on training.TrainerId equals trainer.Id
                where trainer.Id == trainerId
                select training).ToArrayAsync();
        }
    }
}
