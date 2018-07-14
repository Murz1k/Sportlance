using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sportlance.BLL.Entities;
using Sportlance.BLL.Interfaces;
using Sportlance.WebAPI.Extensions;
using Sportlance.WebAPI.Requests;
using Sportlance.WebAPI.Responses;

namespace Sportlance.WebAPI.Controllers
{
    [Route("api/teams/{teamId}/members")]
    public class TeamMemberController : Controller
    {
        private readonly  ITeamService _service;

        public TeamMemberController(ITeamService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<PartialCollectionResponse<TeamPhotoItem>> GetAll(long teamId)
        {
            var trainers = await _service.GetPhotosAsync(0, 10, teamId);

            return trainers.ToPartialCollectionResponse();
        }
        
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> InvitePMemberAsync(long teamId, InviteMemberRequest request)
        {
            await _service.InviteMemberAsync(teamId, request.MemberId);
            return NoContent();
        }
    }
}