using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Sports
{
    public class SportService : ISportService
    {
        private readonly AppDbContext _context;

        public SportService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyCollection<Sport>> GetAllAsync()
        {
            return await _context.Sports.OrderBy(i => i.Name).ToArrayAsync();
        }

        public Task<Sport> GetById(long sportId)
        {
            return _context.Sports.FirstOrDefaultAsync(i => i.Id == sportId);
        }
    }
}