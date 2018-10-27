using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Sports
{
    public interface ISportService
    {
        Task<IReadOnlyCollection<Sport>> GetAllAsync();
        Task<Sport> GetById(long sportId);
    }
}