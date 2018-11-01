using System.Threading.Tasks;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Authentication
{
    public class MockAuthService: IAuthService
    {
        public string GenerateAccessToken(User user, bool rememberMe = false)
        {
            throw new System.NotImplementedException();
        }

        public Task<string> RefreshAccessToken()
        {
            throw new System.NotImplementedException();
        }

        public bool ShouldRefreshToken(string encodedToken)
        {
            throw new System.NotImplementedException();
        }
    }
}