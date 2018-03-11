using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.DAL.Entities;

namespace Sportlance.DAL.Interfaces
{
    public interface ITrainerRepository
    {
        Task<IReadOnlyCollection<Trainer>> GetTrainersBySportId(long sportId);

        Task<IReadOnlyCollection<TrainerSports>> GetTrainersSportsByIds(IEnumerable<long> trainersIds);

        Task<Trainer> GetByIdAsync(long sportId);
    }
}
