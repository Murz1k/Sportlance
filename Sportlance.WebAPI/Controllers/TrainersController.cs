using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Sportlance.BLL.Entities;
using Sportlance.BLL.Interfaces;
using Sportlance.WebAPI.Entities;
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
        public async Task<CollectionResponse<TrainerInfo>> GetAll([FromQuery] GetTrainersQueryRequest request)
        {
            var query = new TrainersQuery
            {
                Price = request.Price,
                ReviewsCount = request.ReviewsCount
            };

            var trainers = await _service.GetTrainersInfos(query);

            return new CollectionResponse<TrainerInfo>
            {
                Items = trainers
            };
        }

        [HttpGet, Route("{trainerId}")]
        public async Task<TrainerInfo> GetById(long trainerId)
        {
            return await _service.GetTrainerInfoById(trainerId);
        }
    }
}