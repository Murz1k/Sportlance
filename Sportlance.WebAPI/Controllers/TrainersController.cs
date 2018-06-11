using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Sportlance.BLL.Entities;
using Sportlance.BLL.Interfaces;
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
        public async Task<PartialCollectionResponse<TrainerListItem>> GetAll([FromQuery] GetTrainersQueryRequest request)
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
    }
}