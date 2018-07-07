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
    [Route("api/teams")]
    public class TeamsController : Controller
    {
        private readonly  ITeamService _service;

        public TeamsController(ITeamService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<PartialCollectionResponse<TeamListItem>> GetAll(
            [FromQuery] GetTrainersQueryRequest request)
        {
            var trainers = await _service.GetAsync(request.ToBLE());

            return trainers.ToPartialCollectionResponse();
        }

        [HttpGet]
        [Route("{teamId}")]
        public async Task<TeamProfile> GetById(long teamId)
        {
            return await _service.GetById(teamId);
        }

        [HttpGet]
        [Authorize]
        [Route("self")]
        public async Task<TeamProfile> GetSelf()
        {
            return await _service.GetById(User.GetUserId());
        }

//        [HttpPost]
//        [Authorize]
//        [Route("availability")]
//        public async Task<IActionResult> SetAvailabilityAsync([FromBody] SetAvailabilityRequest request)
//        {
//            await _service.SetAvailabilityAsync(User.GetUserId(),
//                request.IsAvailable ? TrainerStatus.Available : TrainerStatus.NotAvailable);
//
//            return NoContent();
//        }

        [HttpPut]
        [Authorize]
        [Route("about")]
        public async Task<IActionResult> UpdateAboutAsync([FromBody] UpdateAboutRequest request)
        {
            await _service.UpdateAboutAsync(User.GetUserId(), request.About);

            return NoContent();
        }

//        [HttpPut]
//        [Authorize]
//        [Route("price")]
//        public async Task<IActionResult> UpdatePriceAsync([FromBody] UpdatePriceRequest request)
//        {
//            await _service.UpdatePriceAsync(User.GetUserId(), request.Price);
//
//            return NoContent();
//        }

        [HttpPut("photo")]
        [Authorize]
        public async Task<IActionResult> UploadPhotoAsync([FromForm] IFormFile photo)
        {
            await _service.UpdatePhotoAsync(User.GetUserId(), photo.ToAzureFile());
            return NoContent();
        }
    }
}