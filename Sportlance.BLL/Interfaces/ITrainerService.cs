using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.DAL.Entities;
using Sportlance.WebAPI.Entities;

namespace Sportlance.BLL.Interfaces
{
    public interface ITrainerService
    {
        Task<IReadOnlyCollection<Trainer>> GetTrainersBySportId(long sportId);

        Task<IReadOnlyCollection<TrainerInfo>> GetTrainersInfosBySportId(long sportId);

        Task<TrainerInfo> GetTrainerInfoById(long trainerId);

        Task AddAsync(long userId);
    }
}
