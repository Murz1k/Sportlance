using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sportlance.BLL.Interfaces;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;
using Sportlance.WebAPI.Authentication;
using Sportlance.WebAPI.Authentication.Responses;
using Sportlance.WebAPI.Errors;
using Sportlance.WebAPI.Exceptions;
using Sportlance.WebAPI.Interfaces;
using Sportlance.WebAPI.Requests;
using Sportlance.WebAPI.Responses;
using Sportlance.WebAPI.Utilities;
using Sportlance.WebAPI.Validation;

namespace Sportlance.WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly MailService _mailService;
        private readonly MailTokenService _mailTokenService;
        private readonly AuthService _authService;
        private readonly IRoleRepository _roleRepository;
        private readonly ITrainerService _trainerService;

        public AuthController(
            IUserRepository userRepository,
            ITrainerService trainerService,
            MailService mailService,
            MailTokenService mailTokenService,
            AuthService authService,
            IRoleRepository roleRepository
        )
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _mailService = mailService;
            _mailTokenService = mailTokenService;
            _authService = authService;
            _trainerService = trainerService;
        }

        [HttpPost, Route("check")]
        public async Task<CheckUserResponse> CheckUser([FromBody] CheckUserRequest request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null)
            {
                throw new AppErrorException(new AppError(ErrorCode.UserNotFound));
            }

            return new CheckUserResponse
            {
                Email = user.Email,
            };
        }

        [HttpPost]
        public async Task<LoginResponse> Login([FromBody] LoginRequest request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null || !HashUtils.CheckHash(user.PasswordHash, request.Password))
            {
                throw new AppErrorException(new AppError(ErrorCode.IncorrectPassword));
            }

            var roles = await _roleRepository.GetRolesByUserId(user.Id);

            return new LoginResponse
            {
                FirstName = user.FirstName,
                SecondName = user.LastName,
                Token = user.IsEmailConfirm
                    ? await _authService.GenerateAccessTokenAsync(user, request.RememberMe)
                    : _mailTokenService.EncryptToken(user.Email),
                Email = user.Email,
                IsConfirmed = user.IsEmailConfirm,
                Roles = roles.Select(i => i.Name)
            };
        }

        [HttpPost, Route("register")]
        public async Task<RegistrationResponse> Registration([FromBody] RegistrationRequest request)
        {
            var user = await _userRepository.CreateUser(new User
            {
                Email = request.Email,
                PasswordHash = HashUtils.CreateHash(request.Password),
                FirstName = request.FirstName,
                LastName = request.LastName
            });

            if (request.BeTrainer)
            {
                await _trainerService.AddAsync(user.Id);
            }

            if (request.NeedTrainer)
            {
                
            }

            await _mailService.SendConfirmRegistration(user.Id, user.Email);

            return new RegistrationResponse
            {
                Token = _mailTokenService.EncryptToken(user.Email)
            };
        }

        [HttpPut, Route("confirm")]
        public async Task<LoginResponse> ConfirmRegistration([FromBody] ConfirmRegistrationRequest data)
        {
            var user = await _userRepository.GetByIdAsync(data.UserId);
            if (user == null ||
                !_mailTokenService.CheckEmailConfirmationToken(user.Id.ToString(), user.Email, data.Token))
                throw new AppErrorException(new AppError(ErrorCode.IncorrectData));

            user.IsEmailConfirm = true;
            await _userRepository.UpdateAsync(user, x => x.IsEmailConfirm);

            var roles = await _roleRepository.GetRolesByUserId(user.Id);

            return new LoginResponse
            {
                FirstName = user.FirstName,
                SecondName = user.LastName,
                Token = await _authService.GenerateAccessTokenAsync(user),
                Email = user.Email,
                IsConfirmed = user.IsEmailConfirm,
                Roles = roles.Select(i => i.Name)
            };
        }

        [HttpPost, Route("re-send")]
        public async Task ReSendEmail([FromBody] ResendEmailRequest request)
        {
            var token = _mailTokenService.DecryptToken(request.Token);
            var user = await _userRepository.GetByEmailAsync(token);

            if (user == null)
            {
                throw new AppErrorException(new AppError(ErrorCode.UserNotFound));
            }
            if (user.IsEmailConfirm)
            {
                throw new AppErrorException(new AppError(ErrorCode.RegistrationIsAlreadyConfirmed));
            }

            await _mailService.SendConfirmRegistration(user.Id, user.Email);
        }

        [HttpPut(nameof(SendChangePassword))]
        public async Task<EmptyResponse> SendChangePassword([FromBody] SendChangePasswordRequest data)
        {
            var user = await _userRepository.GetByEmailAsync(data.Email);
            if (user == null)
            {
                throw new AppErrorException(new AppError(ErrorCode.IncorrectData));
            }

            await _mailService.SendChangePassword(user.Id, user.Email, user.PasswordHash);

            return new EmptyResponse();
        }

        [Authorize]
        [HttpPut(nameof(SendChangePasswordForUser))]
        public async Task<EmptyResponse> SendChangePasswordForUser()
        {
            var user = await _userRepository.GetByIdAsync(_authService.UserId);

            await _mailService.SendChangePassword(user.Id, user.Email, user.PasswordHash);

            return new EmptyResponse();
        }

        [Authorize]
        [HttpPut(nameof(SendUpdateEmailForUser))]
        public async Task<EmptyResponse> SendUpdateEmailForUser([FromBody] UpdateEmailRequest data)
        {
            var user = await _userRepository.GetByIdAsync(_authService.UserId);

            if (!HashUtils.CheckHash(user.PasswordHash, data.Password))
            {
                throw new AppErrorException(ErrorCode.IncorrectValidation);
            }

            await _mailService.SendUpdateEmail(user.Email, data.NewEmail);

            return new EmptyResponse();
        }

        [Authorize]
        [HttpPut(nameof(UpdateUserEmail))]
        public async Task<EmptyResponse> UpdateUserEmail(string token)
        {
            var user = new User
            {
                Id = _authService.UserId,
                Email = _mailTokenService.Unprotect(token)
            };

            await _userRepository.UpdateAsync(user, x => x.Email);

            return new EmptyResponse();
        }

        [HttpPut(nameof(UpdatePassword))]
        public async Task<EmptyResponse> UpdatePassword([FromBody] UpdatePasswordRequest data)
        {
            var user = await _userRepository.GetByIdAsync(data.UserId);
            if (user == null ||
                !_mailTokenService.CheckChangePasswordToken(user.Id.ToString(), user.Email, user.PasswordHash,
                    data.Token))
            {
                throw new AppErrorException(new AppError(ErrorCode.IncorrectData));
            }
            user.PasswordHash = HashUtils.CreateHash(data.Password);
            user.IsEmailConfirm = true;

            await _userRepository.UpdateWholeAsync(user);

            return new EmptyResponse();
        }
    }
}