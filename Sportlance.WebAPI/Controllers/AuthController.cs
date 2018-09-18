using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sportlance.BLL.Interfaces;
using Sportlance.DAL.Entities;
using Sportlance.WebAPI.Authentication;
using Sportlance.WebAPI.Authentication.Responses;
using Sportlance.WebAPI.Errors;
using Sportlance.WebAPI.Exceptions;
using Sportlance.WebAPI.Extensions;
using Sportlance.WebAPI.Requests;
using Sportlance.WebAPI.Responses;
using Sportlance.WebAPI.Utilities;
using Sportlance.WebAPI.Validation;

namespace Sportlance.WebAPI.Controllers
{
    [Route("[controller]")]
    public class AuthController : Controller
    {
        private readonly AuthService _authService;
        private readonly MailService _mailService;
        private readonly MailTokenService _mailTokenService;
        private readonly ITrainerService _trainerService;
        private readonly IUserService _userService;

        public AuthController(
            IUserService userService,
            ITrainerService trainerService,
            MailService mailService,
            MailTokenService mailTokenService,
            AuthService authService
        )
        {
            _userService = userService;
            _mailService = mailService;
            _mailTokenService = mailTokenService;
            _authService = authService;
            _trainerService = trainerService;
        }

        [HttpPost]
        [Route("check")]
        public async Task<CheckUserResponse> CheckUser([FromBody] CheckUserRequest request)
        {
            var user = await _userService.GetByEmailAsync(request.Email);
            if (user == null) throw new AppErrorException(new AppError(ErrorCode.UserNotFound));

            return new CheckUserResponse
            {
                Email = user.Email
            };
        }

        [Authorize]
        [HttpPut]
        public async Task<LoginResponse> PutAsync([FromBody] UpdateAccountRequest request)
        {
            var user = await _userService.GetByIdAsync(_authService.UserId);
            if (user == null) throw new AppErrorException(new AppError(ErrorCode.UserNotFound));

            user.FirstName = request.FirstName;
            user.LastName = request.SecondName;
            user.Email = request.Email;
            await _userService.SaveChangesAsync();

            return new LoginResponse
            {
                FirstName = user.FirstName,
                SecondName = user.LastName,
                Token = _authService.GenerateAccessToken(user),
                Email = user.Email,
                IsConfirmed = user.IsEmailConfirm,
                Roles = user.UserRoles.Select(i => i.Role).Select(i => i.Name)
            };
        }

        [HttpPost]
        public async Task<LoginResponse> Login([FromBody] LoginRequest request)
        {
            var user = await _userService.GetByEmailAsync(request.Email);
            if (user == null || !HashUtils.CheckHash(user.PasswordHash, request.Password))
                throw new AppErrorException(new AppError(ErrorCode.IncorrectPassword));

            return new LoginResponse
            {
                FirstName = user.FirstName,
                SecondName = user.LastName,
                Token = user.IsEmailConfirm
                    ? _authService.GenerateAccessToken(user, request.RememberMe)
                    : _mailTokenService.EncryptToken(user.Email),
                Email = user.Email,
                IsConfirmed = user.IsEmailConfirm,
                Roles = user.UserRoles.Select(i => i.Role).Select(i => i.Name)
            };
        }

        [HttpPost]
        [Route("register")]
        public async Task<RegistrationResponse> Registration([FromBody] RegistrationRequest request)
        {
            var user = new User
            {
                Email = request.Email,
                PasswordHash = HashUtils.CreateHash(request.Password),
                FirstName = request.FirstName,
                LastName = request.LastName
            };

            await _userService.AddAsync(user);

            await _mailService.SendConfirmRegistration(user.Id, user.Email);

            return new RegistrationResponse
            {
                Token = _authService.GenerateAccessToken(user)
            };
        }

        [HttpPut]
        [Route("confirm")]
        public async Task<LoginResponse> ConfirmRegistration([FromBody] ConfirmRegistrationRequest data)
        {
            var user = await _userService.GetByIdAsync(data.UserId);
            if (user == null ||
                user.Email != _mailTokenService.DecryptToken(data.Token)
            )
                throw new AppErrorException(new AppError(ErrorCode.IncorrectData));

            user.IsEmailConfirm = true;

            await _userService.SaveChangesAsync();

            return new LoginResponse
            {
                FirstName = user.FirstName,
                SecondName = user.LastName,
                Token = _authService.GenerateAccessToken(user),
                Email = user.Email,
                IsConfirmed = user.IsEmailConfirm,
                Roles = user.UserRoles.Select(i => i.Role).Select(i => i.Name)
            };
        }

        [HttpPost]
        [Route("re-send")]
        public async Task ReSendEmail([FromBody] ResendEmailRequest request)
        {
            var token = _mailTokenService.DecryptToken(request.Token);
            var user = await _userService.GetByEmailAsync(token);

            if (user == null) throw new AppErrorException(new AppError(ErrorCode.UserNotFound));
            if (user.IsEmailConfirm)
                throw new AppErrorException(new AppError(ErrorCode.RegistrationIsAlreadyConfirmed));

            await _mailService.SendConfirmRegistration(user.Id, user.Email);
        }

        [HttpPut(nameof(SendChangePassword))]
        public async Task<EmptyResponse> SendChangePassword([FromBody] SendChangePasswordRequest data)
        {
            var user = await _userService.GetByEmailAsync(data.Email);
            if (user == null) throw new AppErrorException(new AppError(ErrorCode.IncorrectData));

            await _mailService.SendChangePassword(user.Id, user.Email, user.PasswordHash);

            return new EmptyResponse();
        }

        [Authorize]
        [HttpPut(nameof(SendChangePasswordForUser))]
        public async Task<EmptyResponse> SendChangePasswordForUser()
        {
            var user = await _userService.GetByIdAsync(_authService.UserId);

            await _mailService.SendChangePassword(user.Id, user.Email, user.PasswordHash);

            return new EmptyResponse();
        }

        [Authorize]
        [HttpPut(nameof(SendUpdateEmailForUser))]
        public async Task<EmptyResponse> SendUpdateEmailForUser([FromBody] UpdateEmailRequest data)
        {
            var user = await _userService.GetByIdAsync(_authService.UserId);

            if (!HashUtils.CheckHash(user.PasswordHash, data.Password))
                throw new AppErrorException(ErrorCode.IncorrectValidation);

            await _mailService.SendUpdateEmail(user.Email, data.NewEmail);

            return new EmptyResponse();
        }

        [Authorize]
        [HttpPut("email")]
        public async Task<EmptyResponse> UpdateUserEmail(string token)
        {
            var user = await _userService.GetByIdAsync(_authService.UserId);

            user.Email = _mailTokenService.DecryptToken(token);

            await _userService.SaveChangesAsync();

            return new EmptyResponse();
        }

        [Authorize]
        [HttpPut("password")]
        public async Task<EmptyResponse> UpdatePassword([FromBody] UpdatePasswordRequest data)
        {
            var user = await _userService.GetByIdAsync(_authService.UserId);
            if (user == null
                //|| !_mailTokenService.CheckChangePasswordToken(user.Id.ToString(), user.Email, user.PasswordHash, data.Token)
                || !HashUtils.CheckHash(user.PasswordHash, data.OldPassword)
            )
                throw new AppErrorException(new AppError(ErrorCode.IncorrectData));
            user.PasswordHash = HashUtils.CreateHash(data.Password);
            user.IsEmailConfirm = true;

            await _userService.SaveChangesAsync();

            return new EmptyResponse();
        }
    }
}