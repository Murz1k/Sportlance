using System.Threading.Tasks;
using Sportlance.BLL.Entities;

namespace Sportlance.BLL.Interfaces
{
    public interface ITeamService
    {
        Task AddAsync(long authorId);

        Task UpdateAboutAsync(long teamId, string about);

        Task<TeamProfile> GetById(long teamId);

        Task<TeamProfile> GetByAuthorId(long userId);
    }
}