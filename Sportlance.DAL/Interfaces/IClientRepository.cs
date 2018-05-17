using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sportlance.DAL.Entities;

namespace Sportlance.DAL.Interfaces
{
    public interface IClientRepository
    {
        Task AddRangeAsync(IEnumerable<Client> entities);

        Task<IReadOnlyCollection<Client>> GetAllAsync();

        IQueryable<Client> Entities();

        Task SaveChangesAsync();
    }
}