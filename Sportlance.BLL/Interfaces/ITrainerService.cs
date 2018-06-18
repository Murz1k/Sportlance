using System.Threading.Tasks;
using Sportlance.BLL.Entities;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;

namespace Sportlance.BLL.Interfaces
{
    public interface ITrainerService
    {
        Task<PagingCollection<TrainerListItem>> GetAsync(TrainersQuery query);

        Task<TrainerProfile> GetById(long trainerId);

        Task AddAsync(long userId);
        Task SetAvailabilityAsync(long trainerId, TrainerStatus trainerStatus);
    }
}