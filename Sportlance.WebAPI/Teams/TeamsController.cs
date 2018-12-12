﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Core.Errors;
using Sportlance.WebAPI.Core.Extensions;
using Sportlance.WebAPI.Entities;
using Sportlance.WebAPI.Errors;
using Sportlance.WebAPI.Exceptions;
using Sportlance.WebAPI.Extensions;
using Sportlance.WebAPI.Requests;
using Sportlance.WebAPI.Responses;

namespace Sportlance.WebAPI.Teams
{
    [Route("teams")]
    public class TeamsController : Controller
    {
        private readonly ITeamService _service;

        public TeamsController(ITeamService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<PartialCollectionResponse<TeamListItem>> GetAll([FromQuery] TeamQuery request)
        {
            var teams = await _service.GetAsync(request);

            return teams.ToPartialCollectionResponse();
        }

        [HttpGet]
        [Route("{teamId}")]
        public async Task<IActionResult> GetById(long teamId)
        {
                var profile = await _service.GetById(teamId);
                if (profile == null)
                {
                    throw new AppErrorException(ErrorCode.TeamNotFound);
                }

                return Ok(profile);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostAsync([FromForm] CreateTeamRequest request)
        {
            await _service.AddAsync(
                User.GetUserId(),
                request.Title,
                request.SubTitle,
                request.Country,
                request.City,
                request.About,
                request.PhoneNumber,
                request.Photo?.ToAzureFile());

            return NoContent();
        }

        [HttpGet]
        [Authorize]
        [Route("self")]
        public async Task<PartialCollectionResponse<TeamListItem>> GetSelfTeams([FromQuery] TeamQuery query)
        {
            var teams = await _service.GetAsync(query, User.GetUserId());

            return teams.ToPartialCollectionResponse();
        }

//        [HttpPost]
//        [Authorize]
//        [Route("availability")]
//        public async Task<IActionResult> SetAvailabilityAsync([FromBody] SetAvailabilityRequest request)
//        {
//            await _service.SetAvailabilityAsync(User.GetUserId(),
//                request.IsAvailable ? TrainerStatus.Available : TrainerStatus.NotAvailable);
//
//            return NoContent();
//        }

        [HttpPut]
        [Authorize]
        [Route("about")]
        public async Task<IActionResult> UpdateAboutAsync([FromBody] UpdateAboutRequest request)
        {
            await _service.UpdateAboutAsync(User.GetUserId(), request.About);

            return NoContent();
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

        [HttpPut("photo")]
        [Authorize]
        public async Task<IActionResult> UploadPhotoAsync([FromForm] ChangeTeamPhotoRequest request)
        {
            if (!await _service.IsTeamAuthorAsync(User.GetUserId(), request.TeamId))
                throw new AppErrorException(ErrorCode.ServerError);

            await _service.UpdateMainPhotoAsync(request.TeamId, request.photo.ToAzureFile());
            return NoContent();
        }

        [HttpPut("background")]
        [Authorize]
        public async Task<IActionResult> UploadBackgroundAsync([FromForm] ChangeTeamPhotoRequest request)
        {
            if (!await _service.IsTeamAuthorAsync(User.GetUserId(), request.TeamId))
                throw new AppErrorException(ErrorCode.ServerError);

            await _service.UpdateBackgroundImageAsync(request.TeamId, request.photo.ToAzureFile());
            return NoContent();
        }
    }
}