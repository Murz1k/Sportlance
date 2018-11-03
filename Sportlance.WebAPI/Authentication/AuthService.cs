using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using Sportlance.WebAPI.Options;
using Sportlance.WebAPI.Utilities;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Authentication
{
    public class AuthService : IAuthService
    {
        private readonly IDateTime _dateTime;
        private readonly JwtIssuerOptions _jwtOptions;
        private readonly JwtSecurityTokenHandler _tokenHandler;

        public AuthService(IDateTime dateTime,
            IOptions<JwtIssuerOptions> jwtOptions)
        {
            _dateTime = dateTime;
            _tokenHandler = new JwtSecurityTokenHandler();
            _jwtOptions = jwtOptions.Value;
        }

        private JwtPayload CreateJwtPayload(User user)
        {
            var payload = new JwtPayload();
            payload.AddClaim(new Claim("email", user.Email, ClaimValueTypes.Email));
            payload.AddClaim(new Claim("userId", user.Id.ToString()));
            payload.AddClaim(new Claim("firstName", user.FirstName));
            payload.AddClaim(new Claim("secondName", user.LastName));
            payload.AddClaim(new Claim("isConfirmed", user.IsEmailConfirm.ToString(), ClaimValueTypes.Boolean));
            payload.AddClaim(new Claim("photoUrl", user.PhotoUrl ?? ""));

            foreach (var role in user.UserRoles.Select(i => i.Role.ToString()))
            {
                payload.Add(ClaimTypes.Role, role);
            }

            return payload;
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
            var payload = CreateJwtPayload(user);
            var accessToken = new JwtSecurityToken(
                _jwtOptions.Issuer,
                _jwtOptions.Audience,
                payload.Claims,
                _jwtOptions.NotBefore,
                rememberMe ? DateTime.UtcNow.AddDays(30) : _jwtOptions.Expiration,
                _jwtOptions.SigningCredentials) {Payload = {["iat"] = _dateTime.UtcNow.ToUnixTimeSeconds()}};

            return _tokenHandler.WriteToken(accessToken);
        }
    }
}