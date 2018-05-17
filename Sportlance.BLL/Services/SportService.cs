using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;
using Sportlance.WebAPI.Interfaces;

namespace Sportlance.BLL.Services
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
            return await _repository.Entities().OrderBy(i => i.Name).ToArrayAsync();
        }

        public Task<Sport> GetById(long sportId)
        {
            return _repository.GetByIdAsync(sportId);
        }
    }
}
