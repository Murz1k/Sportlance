using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sportlance.DAL.Entities;

namespace Sportlance.DAL.Interfaces
{
    public interface ITrainerRepository
    {
        Task<IReadOnlyCollection<Trainer>> GetTrainersBySportId(long sportId);

        Task<IReadOnlyCollection<TrainerSport>> GetTrainersSportsByIds(IEnumerable<long> trainersIds);

        Task<Trainer> GetByIdAsync(long sportId);

        Task AddRangeAsync(IEnumerable<Trainer> entities);

        Task AddAsync(Trainer trainer);

        Task SaveChangesAsync();

        IQueryable<Trainer> Entities();
    }
}
