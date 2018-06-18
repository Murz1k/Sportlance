using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sportlance.BLL.Entities;
using Sportlance.BLL.Interfaces;
using Sportlance.DAL.Entities;
using Sportlance.WebAPI.Extensions;
using Sportlance.WebAPI.Requests;
using Sportlance.WebAPI.Responses;

namespace Sportlance.WebAPI.Controllers
{
    [Route("api/trainers")]
    public class TrainersController : Controller
    {
        private readonly ITrainerService _service;

        public TrainersController(ITrainerService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<PartialCollectionResponse<TrainerListItem>> GetAll(
            [FromQuery] GetTrainersQueryRequest request)
        {
            var trainers = await _service.GetAsync(request.ToBLE());

            return trainers.ToPartialCollectionResponse();
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
    }
}