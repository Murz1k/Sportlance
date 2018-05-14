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

        public async Task<int> AddTrainerSportsRangeAsync(IEnumerable<TrainerSport> entities)
        {
            await AppContext.TrainerSports.AddRangeAsync(entities);
            return await AppContext.SaveAsync();
        }

        public SportRepository(AppDBContext appContext) : base(appContext)
        {
        }
    }
}
