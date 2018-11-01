using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Authentication
{
    public interface IAuthService
    {
        string GenerateAccessToken(User user, bool rememberMe = false);
        bool ShouldRefreshToken(string encodedToken);
    }
}