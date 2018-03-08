using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Sportlance.BLL.Interfaces;
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
    }
}