using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Sportlance.BLL.Interfaces;
using Sportlance.DAL.Entities;
using Sportlance.WebAPI.Options;
using Sportlance.WebAPI.Utilities;

namespace Sportlance.WebAPI.Authentication
{
    public class AuthService
    {
        private readonly IDateTime _dateTime;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly JwtIssuerOptions _jwtOptions;
        private readonly JwtSecurityTokenHandler _tokenHandler;
        private readonly IUserService _userService;

        public AuthService(IHttpContextAccessor httpContextAccessor, IDateTime dateTime,
            IOptions<JwtIssuerOptions> jwtOptions, IUserService userService)
        {
            _httpContextAccessor = httpContextAccessor;
            _dateTime = dateTime;
            _userService = userService;
            _tokenHandler = new JwtSecurityTokenHandler();
            _jwtOptions = jwtOptions.Value;
        }

        public long UserId => long.Parse(_httpContextAccessor.HttpContext
            .User.FindFirstValue(ClaimTypes.NameIdentifier));

        private ClaimsIdentity CreateClaimsIdentity(User user)
        {
            var claimsIdentity = new ClaimsIdentity(new GenericIdentity(user.Email, "Token"));
            claimsIdentity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));

            foreach (var role in user.UserRoles.Select(i=>i.Role)) claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, role.ToString()));
            return claimsIdentity;
        }

        public async Task<RefreshTokenDto> RefreshAccessToken()
        {
            var user = await _userService.GetByIdAsync(UserId);

            var token = await GenerateAccessTokenAsync(user);

            return new RefreshTokenDto
            {
                Roles = user.UserRoles.Select(i=>i.Role).Select(i => i.Name),
                Token = token
            };
        }

        public bool ShouldRefreshToken(string encodedToken)
        {
            encodedToken = encodedToken.Replace("Bearer ", "");
            var token = _tokenHandler.ReadJwtToken(encodedToken);
            if (!token.Payload.ContainsKey("TokenIssueDate")) return true;
            var issueDate = (DateTime) token.Payload["TokenIssueDate"];

            return (_dateTime.UtcNow - issueDate).TotalMinutes >= _jwtOptions.AccessTokenRefreshInterval.TotalMinutes;
        }

        public async Task<string> GenerateAccessTokenAsync(User user, bool rememberMe = false)
        {
            var identity = CreateClaimsIdentity(user);
            var accessToken = new JwtSecurityToken(
                _jwtOptions.Issuer,
                _jwtOptions.Audience,
                identity.Claims,
                _jwtOptions.NotBefore,
                rememberMe ? DateTime.UtcNow.AddDays(30) : _jwtOptions.Expiration,
                _jwtOptions.SigningCredentials) {Payload = {["TokenIssueDate"] = _dateTime.UtcNow}};


            return _tokenHandler.WriteToken(accessToken);
        }
    }
}