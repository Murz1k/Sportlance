using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.BLL.Interfaces;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;
using Sportlance.DAL.Repositories;

namespace Sportlance.BLL.Services
{
    public class SportService : ISportService
    {
        private readonly ISportRepository _repository;

        public SportService(ISportRepository repository)
        {
            _repository = repository;
        }

        public Task<IReadOnlyCollection<Sport>> GetAllAsync()
            => _repository.GetAllAsync();
    }
}
