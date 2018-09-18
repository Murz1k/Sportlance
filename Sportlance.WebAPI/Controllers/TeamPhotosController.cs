using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sportlance.BLL.Entities;
using Sportlance.BLL.Interfaces;
using Sportlance.WebAPI.Extensions;
using Sportlance.WebAPI.Requests;
using Sportlance.WebAPI.Responses;

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