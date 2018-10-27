using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sportlance.WebAPI.Extensions;
using Sportlance.WebAPI.Responses;
using Sportlance.WebAPI.Teams;
using Sportlance.WebAPI.Entities;
using Sportlance.WebAPI.Core;

namespace Sportlance.WebAPI.Controllers
{
    [Route("teams/{teamId}/photos")]
    public class TeamPhotosController : Controller
    {
        private readonly  ITeamService _service;

        public TeamPhotosController(ITeamService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<PartialCollectionResponse<TeamPhotoItem>> GetAll(long teamId)
        {
            var trainers = await _service.GetPhotosAsync(0, 10, teamId);

            return trainers.ToPartialCollectionResponse();
        }
        
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddPhotoAsync(long teamId, [FromForm] IFormFile photo)
        {
            await _service.AddPhotoAsync(teamId, photo.ToAzureFile());
            return NoContent();
        }
        
        [HttpDelete("{photoId}")]
        [Authorize]
        public async Task<IActionResult> RemovePhotoAsync(long teamId, long photoId)
        {
            await _service.DeletePhotoAsync(teamId, photoId);
            return NoContent();
        }
    }
}