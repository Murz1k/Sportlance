using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Sportlance.BLL.Interfaces;
using Sportlance.DAL.Entities;
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
        public async Task<CollectionResponse<Trainer>> GetAll(long sportId)
        {
            var trainers = await _service.GetTrainersBySportId(sportId);
            return new CollectionResponse<Trainer>
            {
                Items = trainers
            };
        }
    }
}