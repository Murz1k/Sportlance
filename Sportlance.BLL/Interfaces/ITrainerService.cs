using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.WebAPI.Entities;
using Sportlance.DAL.Entities;

namespace Sportlance.WebAPI.Interfaces
{
    public interface ITrainerService
    {
        Task<IReadOnlyCollection<Trainer>> GetTrainersBySportId(long sportId);

        Task<IReadOnlyCollection<TrainerInfo>> GetTrainersInfosBySportId(long sportId);

        Task<TrainerInfo> GetTrainerInfoById(long trainerId);
    }
}
