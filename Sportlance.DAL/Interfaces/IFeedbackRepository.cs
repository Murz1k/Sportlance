using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.DAL.Entities;

namespace Sportlance.DAL.Interfaces
{
    public interface IFeedbackRepository
    {
        Task AddRangeAsync(IEnumerable<Feedback> entities);

        Task<IReadOnlyCollection<Feedback>> GetAllAsync();
        Task<IReadOnlyCollection<Feedback>> GetByTrainerIdAsync(long trainerId);
    }
}
