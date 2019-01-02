using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Sportlance.WebAPI.Core.Options;
using Sportlance.WebAPI.Core.Utilities;
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
            payload.AddClaim(new Claim("inviteLink", user.InviteLink ?? ""));
            
            payload.AddClaims(user.UserRoles.Select(i => new Claim("roles", i.Role.ToString())));

            return payload;
        }

        public long? GetUserIdByToken(string encodedToken)
        {
            var token = _tokenHandler.ReadJwtToken(encodedToken);
            return long.Parse(token.Payload.Claims.FirstOrDefault(i => i.Type == "userId")?.Value);
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

        public string GenerateRefreshToken(User user)
        {
            var payload = CreateJwtPayload(user);
            var accessToken = new JwtSecurityToken(
                _jwtOptions.Issuer,
                _jwtOptions.Audience,
                payload.Claims,
                _jwtOptions.NotBefore,
                DateTime.UtcNow.AddDays(30),
                _jwtOptions.SigningCredentials) {Payload = {["iat"] = _dateTime.UtcNow.ToUnixTimeSeconds()}};

            return _tokenHandler.WriteToken(accessToken);
        }

        public string GenerateAccessToken(User user)
        {
            var payload = CreateJwtPayload(user);
            var accessToken = new JwtSecurityToken(
                _jwtOptions.Issuer,
                _jwtOptions.Audience,
                payload.Claims,
                _jwtOptions.NotBefore,
                _jwtOptions.Expiration,
                _jwtOptions.SigningCredentials) {Payload = {["iat"] = _dateTime.UtcNow.ToUnixTimeSeconds()}};

            return _tokenHandler.WriteToken(accessToken);
        }
    }
}