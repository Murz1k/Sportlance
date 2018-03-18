using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Sportlance.WebAPI.Interfaces;
using Sportlance.DAL.Entities;
using Sportlance.WebAPI.Responses;

namespace Sportlance.WebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/sport")]
    public class SportController : Controller
    {
        private readonly ISportService _service;

        public SportController(ISportService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<CollectionResponse<Sport>> GetAll()
        {
            var sports = await _service.GetAllAsync();
            return new CollectionResponse<Sport>
            {
                Items = sports
            };
        }

        [HttpGet, Route("{sportId}")]
        public async Task<Sport> GetAll(long sportId)
        {
                var sport = await _service.GetById(sportId);
            return sport;
        }
    }
}