﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sportlance.WebAPI.Core.Extensions;
using Sportlance.WebAPI.Extensions;
using Sportlance.WebAPI.Requests;
using Sportlance.WebAPI.Responses;
using Sportlance.WebAPI.Trainers;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Controllers
{
    [Route("trainers/{trainerId}/trainings")]
    public class TrainerTrainingsController : Controller
    {
        private readonly ITrainerService _service;

        public TrainerTrainingsController(ITrainerService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<CollectionResponse<TraningItem>> GetAll(long trainerId, [FromQuery] GetTrainingsRequest request)
        {
            return new CollectionResponse<TraningItem>
            {
                Items = await _service.GetTrainingsAsync(trainerId, request.StartDate, request.EndDate)
            };
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> GetAll(long trainerId, [FromBody] AddTrainingRequest request)
        {
            await _service.AddTrainingAsync(trainerId, User.GetUserId(), request.SportId, request.StartDate);

            return NoContent();
        }
    }
}