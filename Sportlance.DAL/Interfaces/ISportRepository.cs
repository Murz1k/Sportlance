using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sportlance.DAL.Entities;

namespace Sportlance.DAL.Interfaces
{
    public interface ISportRepository
    {
        Task<Sport> GetByIdAsync(long sportId);
        Task AddTrainerSportsRangeAsync(IEnumerable<TrainerSport> entities);
        Task AddRangeAsync(IEnumerable<Sport> entities);
        void RemoveRange(IEnumerable<Sport> entities);

        IQueryable<Sport> Entities();

        Task SaveChangesAsync();
    }
}
