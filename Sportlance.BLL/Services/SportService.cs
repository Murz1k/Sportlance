using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;
using Sportlance.WebAPI.Interfaces;

namespace Sportlance.BLL.Services
{
    public class SportService : ISportService
    {
        private readonly AppDBContext _context;

        public SportService(AppDBContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyCollection<Sport>> GetAllAsync()
        => await _context.Sports.OrderBy(i => i.Name).ToArrayAsync();

        public Task<Sport> GetById(long sportId)
        => _context.Sports.FirstOrDefaultAsync(i => i.Id == sportId);
    }
}
