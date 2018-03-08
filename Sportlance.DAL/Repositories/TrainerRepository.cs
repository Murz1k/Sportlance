using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;

namespace Sportlance.DAL.Repositories
{
    public class TrainerRepository : EntityCrudRepository<Trainer>, ITrainerRepository
    {
        public TrainerRepository(IReadOnlyDataContext readContext, IEditableDataContext editContext) : base(readContext, editContext)
        {
        }

        public async Task<IReadOnlyCollection<Trainer>> GetTrainersBySportId(long sportId)
        {
            return await (from trainer in ReadContext.Trainers
                          join trainerSport in ReadContext.TrainerSports on trainer.Id equals trainerSport.TrainerId
                          join sport in ReadContext.Sports on trainerSport.SportId equals sport.Id
                          where sport.Id == sportId
                          select trainer).ToArrayAsync();
        }
    }
}
