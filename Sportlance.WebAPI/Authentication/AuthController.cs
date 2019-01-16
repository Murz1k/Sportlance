using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.KeyVault.Models;
using Sportlance.Common.Models;
using Sportlance.Common.Providers;
using Sportlance.WebAPI.Authentication.Requests;
using Sportlance.WebAPI.Authentication.Responses;
using Sportlance.WebAPI.Core.Errors;
using Sportlance.WebAPI.Core.Exceptions;
using Sportlance.WebAPI.Core.Extensions;
using Sportlance.WebAPI.Core.Utilities;
using Sportlance.WebAPI.Core.Validation;
using Sportlance.WebAPI.Requests;
using Sportlance.WebAPI.Entities;
using Sportlance.WebAPI.Users;

namespace Sportlance.WebAPI.Authentication
{
    [Route("[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;
        private readonly MailTokenService _mailTokenService;
        private readonly IUserService _userService;
        private readonly AmazonQueueProvider _queueProvider;

        private long UserId => HttpContext
            .User.GetUserId();

        public AuthController(
            IUserService userService,
            MailTokenService mailTokenService,
            IAuthService authService,
            AmazonQueueProvider queueProvider
        )
        {
            _userService = userService;
            _mailTokenService = mailTokenService;
            _authService = authService;
            _queueProvider = queueProvider;
        }

//        Зашел на сайт
//            Зарегистрировался
//        На почту отправилось письмо
//        Перешел по ссылке в почте
//            Аккаунт подтвержден
//            Вход
//        Получение токена.
//
//            Вход если аккаунт не подтвержден
//        ok 200 error: Аккаунт не подтвержден
//            Переход на страницу "Аккаунт не подтвержден", где можно повторно отправить письмо
//            или перейти на страницу логина (поменять аккаунт)
//
//        Регистрация если такой аккаунт есть
//            ok 200 error: Такой аккаунт уже существует. Войти?

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
            var user = await _userService.GetByIdAsync(UserId);
            if (user == null) throw new AppErrorException(new AppError(ErrorCode.UserNotFound));

            user.FirstName = request.FirstName;
            user.LastName = request.SecondName;
            user.Email = request.Email;

            await _userService.SaveChangesAsync();

            return new LoginResponse
            {
                AccessToken = _authService.GenerateAccessToken(user),
                RefreshToken = _authService.GenerateRefreshToken(user)
            };
        }

        [Authorize]
        [HttpPut]
        [Route("token")]
        public async Task<LoginResponse> UpdateTokenAsync([FromBody] UpdateAccountRequest request)
        {
            var user = await _userService.GetByIdAsync(UserId);
            if (user == null) throw new AppErrorException(new AppError(ErrorCode.UserNotFound));

            return new LoginResponse
            {
                AccessToken = _authService.GenerateAccessToken(user),
                RefreshToken = _authService.GenerateRefreshToken(user)
            };
        }

        [HttpPost]
        public async Task<LoginResponse> Login([FromBody] LoginRequest request)
        {
            var user = await _userService.GetByEmailAsync(request.Email);
            if (user == null || !HashUtils.CheckHash(user.PasswordHash, request.Password))
                throw new AppErrorException(new AppError(ErrorCode.IncorrectPassword));

//            if (!user.IsEmailConfirm)
//                throw new AppErrorException(new AppError(ErrorCode.EmailIsNotConfirmed));

            return new LoginResponse
            {
                AccessToken = _authService.GenerateAccessToken(user),
                RefreshToken = _authService.GenerateRefreshToken(user)
            };
        }

        [HttpPost]
        [Route("register")]
        public async Task<LoginResponse> RegistrationAsync([FromBody] RegistrationRequest request)
        {
            var user = await _userService.GetByEmailAsync(request.Email);

            if (user != null)
                throw new AppErrorException(new AppError(ErrorCode.UserAlreadyExist));

            user = new User
            {
                Email = request.Email,
                PasswordHash = HashUtils.CreateHash(request.Password),
                FirstName = request.FirstName,
                LastName = request.LastName,
                InviteLink = CreateInviteLink(8)
            };

            await _userService.AddAsync(user);

            var model = new ConfirmRegisterEmailModel {UserId = user.Id, Email = user.Email};

            await _queueProvider.SendMessageAsync(model.ToJson());

            return new LoginResponse
            {
                AccessToken = _authService.GenerateAccessToken(user),
                RefreshToken = _authService.GenerateRefreshToken(user)
            };
        }

        private static string CreateInviteLink(int length)
        {
            const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            var res = new StringBuilder();
            var rnd = new Random();
            while (0 < length--)
            {
                res.Append(valid[rnd.Next(valid.Length)]);
            }

            return res.ToString();
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
                AccessToken = _authService.GenerateAccessToken(user),
                RefreshToken = _authService.GenerateRefreshToken(user)
            };
        }

        [HttpPost]
        [Route("re-send")]
        public async Task ReSendEmail([FromBody] ResendEmailRequest request)
        {
            var userId = _authService.GetUserIdByToken(request.Token);
            var user = await _userService.GetByIdAsync(userId.Value);

            if (user == null)
                throw new AppErrorException(new AppError(ErrorCode.UserNotFound));

            if (user.IsEmailConfirm)
                throw new AppErrorException(new AppError(ErrorCode.RegistrationIsAlreadyConfirmed));

            var model = new ConfirmRegisterEmailModel {UserId = user.Id, Email = user.Email};

            await _queueProvider.SendMessageAsync(model.ToJson());
        }

        [HttpPost("password")]
        public async Task SendChangePasswordEmail([FromBody] SendChangePasswordRequest data)
        {
            var user = await _userService.GetByEmailAsync(data.Email);
            if (user == null) throw new AppErrorException(new AppError(ErrorCode.IncorrectData));

            var accessToken = _authService.GenerateAccessToken(user);
            var refreshToken = _authService.GenerateRefreshToken(user);

            var model = new ChangePasswordModel {AccessToken = accessToken, RereshToken = refreshToken, Email = user.Email};

            await _queueProvider.SendMessageAsync(model.ToJson());
        }

        [Authorize]
        [HttpPut("password")]
        public async Task<LoginResponse> UpdatePassword([FromBody] UpdatePasswordRequest data)
        {
            var user = await _userService.GetByIdAsync(UserId);

            if (user == null || data.ConfirmPassword != data.NewPassword)
                throw new AppErrorException(new AppError(ErrorCode.IncorrectData));

            user.PasswordHash = HashUtils.CreateHash(data.ConfirmPassword);

            await _userService.SaveChangesAsync();

            return new LoginResponse
            {
                AccessToken = _authService.GenerateAccessToken(user),
                RefreshToken = _authService.GenerateRefreshToken(user)
            };
        }

        [Authorize]
        [HttpPut(nameof(SendUpdateEmailForUser))]
        public async Task<LoginResponse> SendUpdateEmailForUser([FromBody] UpdateEmailRequest data)
        {
            var user = await _userService.GetByIdAsync(UserId);

            if (!HashUtils.CheckHash(user.PasswordHash, data.Password))
                throw new AppErrorException(ErrorCode.IncorrectValidation);

            var model = new ChangeEmailEmailModel {OldEmail = user.Email, NewEmail = data.NewEmail};

            await _queueProvider.SendMessageAsync(model.ToJson());

            return new LoginResponse
            {
                AccessToken = _authService.GenerateAccessToken(user),
                RefreshToken = _authService.GenerateRefreshToken(user)
            };
        }

        [Authorize]
        [HttpPut("email")]
        public async Task<LoginResponse> UpdateUserEmail(string token)
        {
            var user = await _userService.GetByIdAsync(UserId);

            user.Email = _mailTokenService.DecryptToken(token);

            await _userService.SaveChangesAsync();

            return new LoginResponse
            {
                AccessToken = _authService.GenerateAccessToken(user),
                RefreshToken = _authService.GenerateRefreshToken(user)
            };
        }
    }
}