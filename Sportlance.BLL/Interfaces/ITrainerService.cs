using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.DAL.Entities;

namespace Sportlance.BLL.Interfaces
{
    public interface ITrainerService
    {
        Task<IReadOnlyCollection<Trainer>> GetTrainersBySportId(long sportId);
    }
}
