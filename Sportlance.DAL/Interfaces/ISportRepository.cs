using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.DAL.Entities;

namespace Sportlance.DAL.Interfaces
{
    public interface ISportRepository
    {
        Task<IReadOnlyCollection<Sport>> GetAllAsync();
        Task<Sport> GetByIdAsync(long sportId);
        Task<int> AddTrainerSportsRangeAsync(IEnumerable<TrainerSports> entities);
        Task<int> AddRangeAsync(IEnumerable<Sport> entities);
        Task<int> RemoveRangeAsync(IEnumerable<Sport> entities);
    }
}
