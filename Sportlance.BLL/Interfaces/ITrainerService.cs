using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.BLL.Entities;
using Sportlance.DAL.Entities;
using Sportlance.WebAPI.Entities;

namespace Sportlance.BLL.Interfaces
{
    public interface ITrainerService
    {
        Task<IReadOnlyCollection<Trainer>> GetTrainersBySportId(long sportId);

        Task<IReadOnlyCollection<TrainerInfo>> GetTrainersInfos(TrainersQuery query);

        Task<TrainerInfo> GetTrainerInfoById(long trainerId);

        Task AddAsync(long userId);
    }
}
