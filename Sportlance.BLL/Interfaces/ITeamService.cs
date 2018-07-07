using System.Collections.Generic;
using System.Threading.Tasks;
using Sportlance.BLL.Entities;
using Sportlance.DAL.Core;
using Sportlance.WebAPI.Utilities;

namespace Sportlance.BLL.Interfaces
{
    public interface ITeamService
    {
        Task<PagingCollection<TeamListItem>> GetAsync(TrainersQuery query);
        
        Task AddAsync(long authorId);

        Task UpdateAboutAsync(long teamId, string about);

        Task<TeamProfile> GetById(long teamId);

        Task<TeamProfile> GetByAuthorId(long userId);

        Task UpdatePhotoAsync(long teamId, AzureFile photo);

        Task AddPhotoAsync(long teamId, AzureFile photo);

        Task<PagingCollection<TeamPhotoItem>> GetPhotosAsync(int offset, int count, long teamId);
    }
}