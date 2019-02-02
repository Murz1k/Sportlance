using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sportlance.Common.Errors;
using Sportlance.Common.Exceptions;
using Sportlance.Common.Extensions;
using Sportlance.Common.Models;
using Sportlance.WebAPI.Entities;
using Sportlance.WebAPI.Orders;
using Sportlance.WebAPI.Requests;
using Sportlance.WebAPI.Teams.Requests;
using Sportlance.WebAPI.Teams.Responses;
using Sportlance.WebAPI.Trainers.Requests;

namespace Sportlance.WebAPI.Teams
{
    [Route("teams")]
    public class TeamsController : Controller
    {
        private readonly ITeamService _service;
        private readonly IOrdersService _ordersService;

        public TeamsController(ITeamService service, IOrdersService ordersService)
        {
            _service = service;
            _ordersService = ordersService;
        }

        [HttpGet]
        public async Task<PartialCollectionResponse<TeamResponse>> GetAll([FromQuery] TeamQuery request)
        {
            var teams = await _service.GetAsync(request);

            return new PartialCollectionResponse<TeamResponse>(teams.Select(i=>new TeamResponse(i)), teams.Offset, teams.TotalCount);
        }

        [HttpPost]
        [Authorize]
        public async Task<TeamResponse> PostAsync([FromForm] CreateTeamRequest request)
        {
            var team = await _service.AddAsync(
                User.GetUserId(),
                request.Title,
                request.SubTitle,
                //request.Country,
                "Россия",
                request.City,
                request.About,
                request.PhoneNumber,
                request.Photo?.ToStorageFile());

            return new TeamResponse(team);
        }

        [HttpGet]
        [Authorize]
        [Route("self")]
        public async Task<PartialCollectionResponse<TeamResponse>> GetSelfTeams([FromQuery] TeamQuery query)
        {
            var teams = await _service.GetAsync(query, User.GetUserId());

            return new PartialCollectionResponse<TeamResponse>(teams.Select(i => new TeamResponse(i)), teams.Offset, teams.TotalCount);
        }

        [HttpPut("{teamId}/about")]
        [Authorize]
        public async Task<TeamResponse> UpdateAboutAsync(long teamId, [FromBody] UpdateAboutRequest request)
        {
            var team = await _service.UpdateAboutAsync(teamId, request.About);

            return new TeamResponse(team);
        }

        //        [HttpPut]
        //        [Authorize]
        //        [Route("price")]
        //        public async Task<IActionResult> UpdatePriceAsync([FromBody] UpdatePriceRequest request)
        //        {
        //            await _service.UpdatePriceAsync(User.GetUserId(), request.Price);
        //
        //            return NoContent();
        //        }

        [HttpPut("{teamId}/photo")]
        [Authorize]
        public async Task<TeamResponse> UploadPhotoAsync(long teamId, [FromForm] IFormFile photo)
        {
            if (!await _service.IsTeamAuthorAsync(User.GetUserId(), teamId))
            {
                throw new AppErrorException(ErrorCode.UserAccessDenied);
            }

            var team = await _service.UpdateMainPhotoAsync(teamId, photo.ToStorageFile());

            return new TeamResponse(team);
        }

        [HttpPut("{teamId}/background")]
        [Authorize]
        public async Task<TeamResponse> UploadBackgroundAsync(long teamId, [FromForm] IFormFile photo)
        {
            if (!await _service.IsTeamAuthorAsync(User.GetUserId(), teamId))
            {
                throw new AppErrorException(ErrorCode.UserAccessDenied);
            }

            var team = await _service.UpdateBackgroundImageAsync(teamId, photo.ToStorageFile());

            return new TeamResponse(team);
        }

        [HttpGet]
        [Route("{teamId}")]
        public async Task<TeamResponse> GetById(long teamId)
        {
            var team = await _service.GetById(teamId);

            return new TeamResponse(team);
        }

        [HttpGet("{teamId}/photos")]
        public async Task<PartialCollectionResponse<TeamPhotoResponse>> GetPhotoCollection(long teamId)
        {
            var photos = await _service.GetPhotosAsync(0, 10, teamId);

            return new PartialCollectionResponse<TeamPhotoResponse>(photos.Select(i => new TeamPhotoResponse(i)), photos.Offset, photos.TotalCount);
        }

        [Authorize]
        [HttpPost("{teamId}/photos")]
        public async Task<TeamPhotoResponse> AddPhotoAsync(long teamId, [FromForm] IFormFile photo)
        {
            var teamPhoto = await _service.AddPhotoAsync(teamId, photo.ToStorageFile());

            return new TeamPhotoResponse(teamPhoto);
        }

        [HttpDelete("{teamId}/photos/{photoId}")]
        [Authorize]
        public async Task<IActionResult> RemovePhotoAsync(long teamId, long photoId)
        {
            await _service.DeletePhotoAsync(teamId, photoId);

            return Ok();
        }

        [HttpGet("{teamId}/services")]
        [Authorize]
        public async Task<PartialCollectionResponse<TeamServiceResponse>> GetAllServicesAsync(long teamId)
        {
            var items = await _service.GetServicesAsync(teamId);

            return new PartialCollectionResponse<TeamServiceResponse>(items.Select(item => new TeamServiceResponse(item)), 0, 0);
        }

        [HttpGet("{teamId}/services/{serviceId}")]
        [Authorize]
        public async Task<TeamServiceResponse> GetServiceByIdAsync(long teamId, long serviceId)
        {
            return new TeamServiceResponse(await _service.GetServiceByIdAsync(teamId, serviceId));
        }

        [HttpPost("{teamId}/services")]
        [Authorize]
        public async Task<TeamServiceResponse> AddServiceAsync(long teamId, [FromBody]UpdateTeamServiceRequest request)
        {
            return new TeamServiceResponse(await _service.AddServiceAsync(teamId, request.Name, request.Description, request.Duration, request.Price));
        }

        [HttpPut("{teamId}/services/{serviceId}")]
        [Authorize]
        public async Task<TeamServiceResponse> UpdateServiceAsync(long teamId, long serviceId, [FromBody]UpdateTeamServiceRequest request)
        {
            return new TeamServiceResponse(await _service.UpdateServiceAsync(teamId, serviceId, request.Name, request.Description, request.Duration, request.Price));
        }

        [HttpDelete("{teamId}/services/{serviceId}")]
        [Authorize]
        public async Task<IActionResult> DeleteServiceAsync(long teamId, long serviceId)
        {
            await _service.DeleteServiceAsync(teamId, serviceId);

            return NoContent();
        }

        [HttpGet("{teamId}/members")]
        public async Task<PartialCollectionResponse<TeamPhoto>> GetMembersCollection(long teamId)
        {
            var trainers = await _service.GetPhotosAsync(0, 10, teamId);

            return trainers.ToPartialCollectionResponse();
        }

        [HttpPost("{teamId}/members")]
        [Authorize]
        public async Task<IActionResult> InviteMemberAsync(long teamId, [FromBody] InviteMemberRequest request)
        {
            await _service.InviteMemberAsync(teamId, request.MemberId);

            return NoContent();
        }

        [HttpGet]
        [Authorize]
        [Route("{teamId}/trainers/{trainerId}/canInvite")]
        public Task<bool> CanInviteTrainer(long teamId, long trainerId)
        {
            return _service.CanInviteTrainer(User.GetUserId(), trainerId, teamId);
        }

        //[HttpPost]
        //[Authorize]
        //[Route("availability")]
        //public async Task<IActionResult> SetAvailabilityAsync([FromBody] SetAvailabilityRequest request)
        //{
        //    await _service.SetAvailabilityAsync(User.GetUserId(),
        //        request.IsAvailable ? TrainerStatus.Available : TrainerStatus.NotAvailable);

        //    return NoContent();
        //}
    }
}