using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sportlance.DAL.Entities;

namespace Sportlance.DAL.Interfaces
{
    public interface IFeedbackRepository
    {
        Task AddRangeAsync(IEnumerable<Feedback> entities);

        Task<IReadOnlyCollection<Feedback>> GetAllAsync();
        IQueryable<Feedback> Entities();
        Task<IReadOnlyCollection<Feedback>> GetByTrainerIdAsync(long trainerId);
        Task<IDictionary<long, Feedback[]>> GetByTrainersIdsAsync(IEnumerable<long> trainerIds);
    }
}
