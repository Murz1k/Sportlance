using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;

namespace Sportlance.DAL.Repositories
{
    public class ClientRepository: IClientRepository
    {
        private readonly AppDBContext _appContext;

        public ClientRepository(AppDBContext appContext)
        {
            _appContext = appContext;
        }

        public async Task<int> AddRangeAsync(IEnumerable<Client> entities)
        {
            await _appContext.Clients.AddRangeAsync(entities);
            return await _appContext.SaveAsync();
        }


        public async Task<IReadOnlyCollection<Client>> GetAllAsync()
        {
            return await _appContext.Clients.ToArrayAsync();
        }

        public IQueryable<Client> Entities() => _appContext.Clients;
    }
}
