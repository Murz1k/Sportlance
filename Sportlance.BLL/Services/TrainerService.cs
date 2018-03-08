using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.BLL.Interfaces;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;

namespace Sportlance.BLL.Services
{
    public class TrainerService : ITrainerService
    {
        private readonly ITrainerRepository _repository;

        public TrainerService(ITrainerRepository repository)
        {
            _repository = repository;
        }

        public async Task<IReadOnlyCollection<Trainer>> GetTrainersBySportId(long sportId)
        {
            return await _repository.GetTrainersBySportId(sportId);
        }
    }
}
