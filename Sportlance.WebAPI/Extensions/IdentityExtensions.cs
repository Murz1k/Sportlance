using System;
using System.Security.Claims;
using Sportlance.WebAPI.Errors;
using Sportlance.WebAPI.Exceptions;

namespace Sportlance.WebAPI.Extensions
{
    public static class IdentityExtensions
    {
        public static long GetUserId(this ClaimsPrincipal user)
        {
            var userIdClaim = user.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                throw new AppErrorException(ErrorCode.AuthenticationError);
            return Convert.ToInt64(userIdClaim);
        }
    }
}