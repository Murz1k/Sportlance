using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sportlance.WebAPI.Interfaces;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;
using Sportlance.DAL.Repositories;

namespace Sportlance.WebAPI.Services
{
    public class SportService : ISportService
    {
        private readonly ISportRepository _repository;

        public SportService(ISportRepository repository)
        {
            _repository = repository;
        }

        public async Task<IReadOnlyCollection<Sport>> GetAllAsync()
        {
            var sports = await _repository.GetAllAsync();
            return sports.OrderBy(i => i.Name).ToArray();
        }

        public Task<Sport> GetById(long sportId)
        {
            return _repository.GetByIdAsync(sportId);
        }
    }
}
