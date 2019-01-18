using System;
using System.Security.Claims;
using Sportlance.Common.Errors;
using Sportlance.Common.Exceptions;

namespace Sportlance.Common.Extensions
{
    public static class IdentityExtensions
    {
        public static long GetUserId(this ClaimsPrincipal user)
        {
            var userIdClaim = user.FindFirst("userId");
            if (userIdClaim == null)
                throw new AppErrorException(ErrorCode.AuthenticationError);
            return Convert.ToInt64(userIdClaim);
        }
    }
}