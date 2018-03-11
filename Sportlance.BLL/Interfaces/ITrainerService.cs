using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.BLL.Entities;
using Sportlance.DAL.Entities;

namespace Sportlance.BLL.Interfaces
{
    public interface ITrainerService
    {
        Task<IReadOnlyCollection<Trainer>> GetTrainersBySportId(long sportId);

        Task<IReadOnlyCollection<TrainerInfo>> GetTrainersInfosBySportId(long sportId);

        Task<TrainerInfo> GetTrainerInfoById(long trainerId);
    }
}
