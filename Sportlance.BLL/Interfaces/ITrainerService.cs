using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.BLL.Entities;

namespace Sportlance.BLL.Interfaces
{
    public interface ITrainerService
    {
        Task<IReadOnlyCollection<TrainerListItem>> GetAsync(TrainersQuery query);

        Task<TrainerProfile> GetById(long trainerId);

        Task AddAsync(long userId);
    }
}
