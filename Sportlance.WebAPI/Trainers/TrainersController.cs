using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sportlance.Common.Errors;
using Sportlance.Common.Exceptions;
using Sportlance.Common.Extensions;
using Sportlance.Common.Models;
using Sportlance.WebAPI.Authentication;
using Sportlance.WebAPI.Authentication.Responses;
using Sportlance.WebAPI.Entities;
using Sportlance.WebAPI.Requests;
using Sportlance.WebAPI.Trainers.Requests;
using Sportlance.WebAPI.Trainers.Responses;
using Sportlance.WebAPI.Users;

namespace Sportlance.WebAPI.Trainers
{
    [Route("trainers")]
    public class TrainersController : Controller
    {
        private readonly ITrainersService _service;
        private readonly IUserService _userService;
        private readonly IAuthService _authService;

        public TrainersController(
            ITrainersService service,
            IUserService userService,
            IAuthService authService
            )
        {
            _service = service;
            _authService = authService;
            _userService = userService;
        }

        [HttpGet]
        public async Task<PartialCollectionResponse<TrainerResponse>> GetAll([FromQuery] GetTrainersQueryRequest request)
        {
            var trainers = await _service.GetAsync(request.ToBLE());

            return new PartialCollectionResponse<TrainerResponse>(trainers.Select(i => new TrainerResponse(i)), trainers.Offset, trainers.TotalCount);
        }
        
        [HttpPost]
        [Authorize]
        public async Task<LoginResponse> BeTrainerAsync()
        {
            var user = await _userService.GetByIdAsync(User.GetUserId());
            if (user == null)
            {
                throw new AppErrorException(ErrorCode.UserNotFound);
            }
            
            await _service.AddAsync(user);

            return new LoginResponse
            {
                AccessToken = _authService.GenerateAccessToken(user),
                RefreshToken = _authService.GenerateRefreshToken(user)
            };
        }

        [HttpGet]
        [Route("{trainerId}")]
        public async Task<TrainerResponse> GetById(long trainerId)
        {
            var trainer = await _service.GetByIdAsync(trainerId);

            return new TrainerResponse(trainer);
        }

        [HttpGet("{trainerId}/trainings")]
        public async Task<CollectionResponse<Training>> GetTrainings(long trainerId, [FromQuery] GetTrainingsRequest request)
        {
            var trainings = await _service.GetTrainingsAsync(trainerId, request.StartDate, request.EndDate);

            return new CollectionResponse<Training>
            {
                Items = trainings
            };
        }

        [HttpGet("{trainerId}/experience")]
        public async Task<IEnumerable<WorkExperienceResponse>> GetWorkExperience(long trainerId)
        {
            var trainings = await _service.GetWorkExperienceByTrainerId(trainerId);

            return trainings.Select(i => new WorkExperienceResponse(i));
        }

        [Authorize]
        [HttpPost("{trainerId}/trainings")]
        public async Task<Training> AddTraining(long trainerId, [FromBody] AddTrainingRequest request)
        {
            var training = await _service.AddTrainingAsync(trainerId, User.GetUserId(), request.SportId, request.StartDate);

            return training;
        }

        [HttpGet]
        [Authorize]
        [Route("self")]
        public async Task<TrainerResponse> GetSelf()
        {
            var trainer = await _service.GetByIdAsync(User.GetUserId());

            return new TrainerResponse(trainer);
        }

        [HttpPost]
        [Authorize]
        [Route("availability")]
        public async Task<IActionResult> SetAvailabilityAsync([FromBody] SetAvailabilityRequest request)
        {
            await _service.SetAvailabilityAsync(User.GetUserId(),
                request.IsAvailable ? TrainerStatus.Available : TrainerStatus.NotAvailable);

            return NoContent();
        }

        [HttpPut]
        [Authorize]
        [Route("about")]
        public async Task<IActionResult> UpdateAboutAsync([FromBody] UpdateAboutRequest request)
        {
            await _service.UpdateAboutAsync(User.GetUserId(), request.About);

            return NoContent();
        }

        [HttpPut]
        [Authorize]
        [Route("skills")]
        public async Task<TrainerResponse> UpdateSkillsAsync([FromBody] UpdateSkillsRequest request)
        {
            var trainer = await _service.UpdateSkillsAsync(User.GetUserId(), request.Skills.Select(i=>i.ToBLE()).ToArray());

            return new TrainerResponse(trainer);
        }

        [HttpPut]
        [Authorize]
        [Route("price")]
        public async Task<IActionResult> UpdatePriceAsync([FromBody] UpdatePriceRequest request)
        {
            await _service.UpdatePriceAsync(User.GetUserId(), request.Price);

            return NoContent();
        }

        [HttpPut("background")]
        [Authorize]
        public async Task<IActionResult> UploadBackgroundAsync([FromForm] IFormFile photo)
        {
            await _service.UpdateBackgroundImageAsync(User.GetUserId(), photo.ToStorageFile());
            return NoContent();
        }
    }
}