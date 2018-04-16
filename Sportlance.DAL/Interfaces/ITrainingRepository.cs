using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Sportlance.DAL.Entities;

namespace Sportlance.DAL.Interfaces
{
    public interface ITrainingRepository
    {
        Task<int> AddRangeAsync(IEnumerable<Training> entities);

        Task<IReadOnlyCollection<Training>> GetAllAsync();
        Task<IReadOnlyCollection<Training>> GetByTrainerIdAsync(long trainerId);
    }
}
