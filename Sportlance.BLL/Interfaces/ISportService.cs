using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.DAL.Entities;

namespace Sportlance.BLL.Interfaces
{
    public interface ISportService
    {
        Task<IReadOnlyCollection<Sport>> GetAllAsync();
        Task<Sport> GetById(long sportId);
    }
}
