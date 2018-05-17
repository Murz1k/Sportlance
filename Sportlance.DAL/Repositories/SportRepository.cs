using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;

namespace Sportlance.DAL.Repositories
{
    public class SportRepository : ISportRepository
    {
        private readonly AppDBContext _appContext;

        public SportRepository(AppDBContext appContext)
        {
            _appContext = appContext;
        }

        public IQueryable<Sport> Entities() => _appContext.Sports;
        public Task SaveChangesAsync() => _appContext.SaveChangesAsync();

        public Task<Sport> GetByIdAsync(long sportId)
            => _appContext.Sports.FirstOrDefaultAsync(i => i.Id == sportId);

        public Task AddTrainerSportsRangeAsync(IEnumerable<TrainerSport> entities)
            => _appContext.TrainerSports.AddRangeAsync(entities);

        public Task AddRangeAsync(IEnumerable<Sport> entities)
            => _appContext.AddRangeAsync();

        public void RemoveRange(IEnumerable<Sport> entities)
            => _appContext.RemoveRange(entities);
    }
}