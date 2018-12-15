using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sportlance.WebAPI.Authentication;
using Sportlance.WebAPI.Authentication.Responses;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Core.Errors;
using Sportlance.WebAPI.Core.Exceptions;
using Sportlance.WebAPI.Core.Extensions;
using Sportlance.WebAPI.Entities;
using Sportlance.WebAPI.Requests;
using Sportlance.WebAPI.Trainers.Requests;
using Sportlance.WebAPI.Users;
using TrainerListItem = Sportlance.WebAPI.Entities.TrainerListItem;
using TrainerProfile = Sportlance.WebAPI.Entities.TrainerProfile;
using TrainerStatus = Sportlance.WebAPI.Entities.TrainerStatus;

namespace Sportlance.WebAPI.Trainers
{
    [Route("trainers")]
    public class TrainersController : Controller
    {
        private readonly ITrainerService _service;
        private readonly IUserService _userService;
        private readonly IAuthService _authService;

        public TrainersController(
            ITrainerService service,
            IUserService userService,
            IAuthService authService
            )
        {
            _service = service;
            _authService = authService;
            _userService = userService;
        }

        [HttpGet]
        public async Task<PartialCollectionResponse<TrainerListItem>> GetAll([FromQuery] GetTrainersQueryRequest request)
        {
            var trainers = await _service.GetAsync(request.ToBLE());

            return trainers.ToPartialCollectionResponse();
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
            
            user = await _service.AddAsync(user);

            return new LoginResponse
            {
                AccessToken = _authService.GenerateAccessToken(user),
                RefreshToken = _authService.GenerateRefreshToken(user)
            };
        }

        [HttpGet]
        [Authorize]
        [Route("{trainerId}/canInvite")]
        public async Task<bool> CanInviteTrainer(long trainerId)
        {
            return await _service.CanInviteTrainer(User.GetUserId(), trainerId);
        }

        [HttpGet]
        [Route("{trainerId}")]
        public async Task<TrainerProfile> GetById(long trainerId)
        {
            return await _service.GetById(trainerId);
        }

        [HttpGet("{trainerId}/trainings")]
        public async Task<CollectionResponse<TraningItem>> GetTrainings(long trainerId, [FromQuery] GetTrainingsRequest request)
        {
            return new CollectionResponse<TraningItem>
            {
                Items = await _service.GetTrainingsAsync(trainerId, request.StartDate, request.EndDate)
            };
        }

        [Authorize]
        [HttpPost("{trainerId}/trainings")]
        public async Task<IActionResult> AddTraining(long trainerId, [FromBody] AddTrainingRequest request)
        {
            await _service.AddTrainingAsync(trainerId, User.GetUserId(), request.SportId, request.StartDate);

            return NoContent();
        }

        [HttpGet]
        [Authorize]
        [Route("self")]
        public async Task<TrainerProfile> GetSelf()
        {
            return await _service.GetById(User.GetUserId());
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
            await _service.UpdateBackgroundImageAsync(User.GetUserId(), photo.ToAzureFile());
            return NoContent();
        }
    }
}