using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.BLL.Entities;
using Sportlance.DAL.Core;

namespace Sportlance.BLL.Interfaces
{
    public interface IFeedbackService
    {
        Task<PagingCollection<ReviewInfo>> GetTrainerFeedbacksAsync(long trainerId, int offset, int count);
    }
}