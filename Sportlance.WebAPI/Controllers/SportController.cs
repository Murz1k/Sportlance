using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Sportlance.BLL.Interfaces;
using Sportlance.DAL.Entities;

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
        public async Task<IReadOnlyCollection<Sport>> GetAll()
        {
            return await _service.GetAllAsync();
        }

    }
}