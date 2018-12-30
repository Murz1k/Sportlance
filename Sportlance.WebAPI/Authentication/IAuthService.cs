using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Authentication
{
    public interface IAuthService
    {
        string GenerateAccessToken(User user);
        string GenerateRefreshToken(User user);
        bool ShouldRefreshToken(string encodedToken);
        long? GetUserIdByToken(string encodedToken);
    }
}