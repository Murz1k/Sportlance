using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;

namespace Sportlance.DAL.Repositories
{
    public class SportRepository : EntityCrudRepository<Sport>, ISportRepository
    {
        public SportRepository(IReadOnlyDataContext readContext, IEditableDataContext editContext)
            : base(readContext, editContext)
        {

        }

        public async Task<int> AddTrainerSportsRangeAsync(IEnumerable<TrainerSports> entities)
        {
            await EditContext.TrainerSports.AddRangeAsync(entities);
            return await EditContext.SaveAsync();
        }
    }
}
