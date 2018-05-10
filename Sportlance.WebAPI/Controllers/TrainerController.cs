using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Sportlance.BLL.Interfaces;
using Sportlance.WebAPI.Entities;
using Sportlance.WebAPI.Interfaces;
using Sportlance.WebAPI.Responses;

namespace Sportlance.WebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/trainer")]
    public class TrainerController : Controller
    {
        private readonly ITrainerService _service;

        public TrainerController(ITrainerService service)
        {
            _service = service;
        }

        [HttpGet, Route("sport/{sportId}")]
        public async Task<CollectionResponse<TrainerInfo>> GetAll(long sportId)
        {
            var trainers = await _service.GetTrainersInfosBySportId(sportId);
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