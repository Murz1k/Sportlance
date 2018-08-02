using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sportlance.BLL.Entities;
using Sportlance.BLL.Interfaces;
using Sportlance.WebAPI.Extensions;
using Sportlance.WebAPI.Requests;
using Sportlance.WebAPI.Responses;

namespace Sportlance.WebAPI.Controllers
{
    [Route("api/trainers/{trainerId}/trainings")]
    public class TrainerTrainingsController : Controller
    {
        private readonly  ITrainerService _service;

        public TrainerTrainingsController(ITrainerService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<CollectionResponse<TraningItem>> GetAll(long trainerId, [FromQuery] GetTrainingsRequest request)
        {
            return new CollectionResponse<TraningItem>
            {
                Items = await _service.GetTrainingsAsync(trainerId, request.StartDate, request.EndDate)
            };
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> GetAll(long trainerId, [FromBody] AddTrainingRequest request)
        {
            await _service.AddTrainingAsync(trainerId, User.GetUserId(), request.SportId, request.StartDate);

            return NoContent();
        }
    }
}