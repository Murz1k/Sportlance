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
            var claimsIdentity = new ClaimsIdentity("Token");
            claimsIdentity.AddClaim(new Claim("email", user.Email));
            claimsIdentity.AddClaim(new Claim("userId", user.Id.ToString()));
            claimsIdentity.AddClaim(new Claim("firstName", user.FirstName));
            claimsIdentity.AddClaim(new Claim("secondName", user.LastName));
            claimsIdentity.AddClaim(new Claim("isConfirmed", user.IsEmailConfirm.ToString()));
            claimsIdentity.AddClaim(new Claim("photoUrl", user.PhotoUrl ?? ""));

            if (user.UserRoles.Count > 0)
            {
                foreach (var role in user.UserRoles.Select(i => i.Role))
                    claimsIdentity.AddClaim(new Claim("roles", role.ToString()));
            }
            else
            {
                claimsIdentity.AddClaim(new Claim("roles", "[]"));
            }

            return claimsIdentity;
        }

        public async Task<string> RefreshAccessToken()
        {
            var user = await _userService.GetByIdAsync(UserId);

            return GenerateAccessToken(user);
        }

        public bool ShouldRefreshToken(string encodedToken)
        {
            encodedToken = encodedToken.Replace("Bearer ", "");
            var token = _tokenHandler.ReadJwtToken(encodedToken);
            if (!token.Payload.ContainsKey("iat")) return true;
            var issuedAt = DateTimeOffset.FromUnixTimeSeconds((long) token.Payload["iat"]);

            return _dateTime.UtcNow.Subtract(issuedAt).TotalMinutes >=
                   _jwtOptions.AccessTokenRefreshInterval.TotalMinutes;
        }

        public string GenerateAccessToken(User user, bool rememberMe = false)
        {
            var identity = CreateClaimsIdentity(user);
            var accessToken = new JwtSecurityToken(
                _jwtOptions.Issuer,
                _jwtOptions.Audience,
                identity.Claims,
                _jwtOptions.NotBefore,
                rememberMe ? DateTime.UtcNow.AddDays(30) : _jwtOptions.Expiration,
                _jwtOptions.SigningCredentials) {Payload = {["iat"] = _dateTime.UtcNow.ToUnixTimeSeconds()}};


            return _tokenHandler.WriteToken(accessToken);
        }
    }
}