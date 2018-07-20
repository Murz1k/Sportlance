using System.Threading.Tasks;
using Sportlance.BLL.Entities;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;
using Sportlance.WebAPI.Utilities;

namespace Sportlance.BLL.Interfaces
{
    public interface ITrainerService
    {
        Task<PagingCollection<TrainerListItem>> GetAsync(TrainersQuery query);

        Task<TrainerProfile> GetById(long trainerId);

        Task AddAsync(long userId);
        
        Task SetAvailabilityAsync(long trainerId, TrainerStatus trainerStatus);

        Task UpdateAboutAsync(long trainerId, string about);

        Task UpdateBackgroundImageAsync(long trainerId, AzureFile photo);

        Task UpdateMainPhotoAsync(long trainerId, AzureFile photo);

        Task UpdatePriceAsync(long trainerId, double price);

        Task<bool> CanInviteTrainer(long userId, long trainerId);
    }
}