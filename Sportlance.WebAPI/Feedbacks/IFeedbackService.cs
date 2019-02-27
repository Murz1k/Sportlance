using System.Threading.Tasks;
using Sportlance.Common.Models;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Feedbacks
{
    public interface IFeedbackService
    {
        Task<PagingCollection<ReviewInfo>> GetTrainerFeedbacksAsync(long trainerId, int offset, int count);

        Task AddMainFeedbackAsync(long userId, string firstName, string email, string comment);
    }
}