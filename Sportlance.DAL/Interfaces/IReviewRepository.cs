using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.DAL.Entities;

namespace Sportlance.DAL.Interfaces
{
    public interface IReviewRepository
    {
        Task<int> AddRangeAsync(IEnumerable<Review> entities);

        Task<IReadOnlyCollection<Review>> GetAllAsync();
        Task<IReadOnlyCollection<Review>> GetByTrainerIdAsync(long trainerId);
    }
}
