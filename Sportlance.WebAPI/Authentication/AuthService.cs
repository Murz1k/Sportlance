using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;
using Sportlance.WebAPI.Options;
using Sportlance.WebAPI.Utilities;

namespace Sportlance.WebAPI.Authentication
{

    public class AuthService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IDateTime _dateTime;
        private readonly JwtSecurityTokenHandler _tokenHandler;
        private readonly JwtIssuerOptions _jwtOptions;
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;

        public AuthService(IHttpContextAccessor httpContextAccessor, IDateTime dateTime, IOptions<JwtIssuerOptions> jwtOptions, IUserRepository userRepository, IRoleRepository roleRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _dateTime = dateTime;
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _tokenHandler = new JwtSecurityTokenHandler();
            _jwtOptions = jwtOptions.Value;
        }

        public long UserId => long.Parse(_httpContextAccessor.HttpContext
                                                           .User.FindFirstValue(ClaimTypes.NameIdentifier));

        public async Task<ClaimsIdentity> CreateClaimsIdentityAsync(User user)
        {
            var claimsIdentity = new ClaimsIdentity(new GenericIdentity(user.Email, "Token"));
            claimsIdentity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));

            var roles = await _roleRepository.GetRolesByUserId(user.Id);

            foreach (var role in roles)
            {
                claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, role.ToString()));
            }
            return claimsIdentity;
        }

        public async Task<RefreshTokenDto> RefreshAccessToken()
        {   
            var user = await _userRepository.GetByIdAsync(UserId);
            var roles = await _roleRepository.GetRolesByUserId(UserId);
            
            var token = await GenerateAccessTokenAsync(user);

            return new RefreshTokenDto
            {
                Roles = roles.Select(i=>i.Name),
                Token = token
            };
        }

        public bool ShouldRefreshToken(string encodedToken)
        {
            encodedToken = encodedToken.Replace("Bearer ", "");
            var token = _tokenHandler.ReadJwtToken(encodedToken);
            if (!token.Payload.ContainsKey("TokenIssueDate"))
            {
                return true;
            }
            var issueDate = (DateTime)token.Payload["TokenIssueDate"];

            return (_dateTime.UtcNow - issueDate).TotalMinutes >= _jwtOptions.AccessTokenRefreshInterval.TotalMinutes;
        }

        public async Task<string> GenerateAccessTokenAsync(User user, bool rememberMe = false)
        {
            var identity = await CreateClaimsIdentityAsync(user);
            var accessToken = new JwtSecurityToken(
                issuer: _jwtOptions.Issuer,
                audience: _jwtOptions.Audience,
                claims: identity.Claims,
                notBefore: _jwtOptions.NotBefore,
                expires: rememberMe ? DateTime.UtcNow.AddDays(30) : _jwtOptions.Expiration,
                signingCredentials: _jwtOptions.SigningCredentials) {Payload = {["TokenIssueDate"] = _dateTime.UtcNow}};


            return _tokenHandler.WriteToken(accessToken);
        }
    }
}
