using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Extensions;
using Sportlance.WebAPI.Requests;
using Sportlance.WebAPI.Responses;
using TrainerListItem = Sportlance.WebAPI.Entities.TrainerListItem;
using TrainerProfile = Sportlance.WebAPI.Entities.TrainerProfile;
using TrainerStatus = Sportlance.WebAPI.Entities.TrainerStatus;

namespace Sportlance.WebAPI.Trainers
{
    [Route("trainers")]
    public class TrainersController : Controller
    {
        private readonly ITrainerService _service;

        public TrainersController(ITrainerService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<PartialCollectionResponse<TrainerListItem>> GetAll([FromQuery] GetTrainersQueryRequest request)
        {
            var trainers = await _service.GetAsync(request.ToBLE());

            return trainers.ToPartialCollectionResponse();
        }

        [HttpGet]
        [Authorize]
        [Route("{trainerId}/canInvite")]
        public async Task<bool> CanInviteTrainer(long trainerId)
        {
            return await _service.CanInviteTrainer(User.GetUserId(), trainerId);
        }

        [HttpGet]
        [Route("{trainerId}")]
        public async Task<TrainerProfile> GetById(long trainerId)
        {
            return await _service.GetById(trainerId);
        }

        [HttpGet]
        [Authorize]
        [Route("self")]
        public async Task<TrainerProfile> GetSelf()
        {
            return await _service.GetById(User.GetUserId());
        }

        [HttpPost]
        [Authorize]
        [Route("availability")]
        public async Task<IActionResult> SetAvailabilityAsync([FromBody] SetAvailabilityRequest request)
        {
            await _service.SetAvailabilityAsync(User.GetUserId(),
                request.IsAvailable ? TrainerStatus.Available : TrainerStatus.NotAvailable);

            return NoContent();
        }

        [HttpPut]
        [Authorize]
        [Route("about")]
        public async Task<IActionResult> UpdateAboutAsync([FromBody] UpdateAboutRequest request)
        {
            await _service.UpdateAboutAsync(User.GetUserId(), request.About);

            return NoContent();
        }

        [HttpPut]
        [Authorize]
        [Route("price")]
        public async Task<IActionResult> UpdatePriceAsync([FromBody] UpdatePriceRequest request)
        {
            await _service.UpdatePriceAsync(User.GetUserId(), request.Price);

            return NoContent();
        }

        [HttpPut("photo")]
        [Authorize]
        public async Task<IActionResult> UploadPhotoAsync([FromForm] IFormFile photo)
        {
            await _service.UpdateMainPhotoAsync(User.GetUserId(), photo.ToAzureFile());
            return NoContent();
        }

        [HttpPut("background")]
        [Authorize]
        public async Task<IActionResult> UploadBackgroundAsync([FromForm] IFormFile photo)
        {
            await _service.UpdateBackgroundImageAsync(User.GetUserId(), photo.ToAzureFile());
            return NoContent();
        }
    }
}