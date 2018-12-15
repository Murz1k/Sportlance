using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Sports
{
    [Route("sport")]
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

        [HttpGet("{sportId}")]
        public async Task<Sport> GetById(long sportId)
        {
            return await _service.GetById(sportId);
        }
    }
}