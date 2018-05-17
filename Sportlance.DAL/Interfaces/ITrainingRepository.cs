using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sportlance.DAL.Entities;

namespace Sportlance.DAL.Interfaces
{
    public interface ITrainingRepository
    {
        Task AddRangeAsync(IEnumerable<Training> entities);

        IQueryable<Training> Entities();
        Task<IReadOnlyCollection<Training>> GetByTrainerIdAsync(long trainerId);
        Task<IDictionary<long, Training[]>> GetByTrainersIdsAsync(IEnumerable<long> trainerIds);
    }
}
