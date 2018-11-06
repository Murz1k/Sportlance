using System.Threading.Tasks;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Authentication
{
    public class MockAuthService: IAuthService
    {
        public string GenerateAccessToken(User user)
        {
            throw new System.NotImplementedException();
        }

        public string GenerateRefreshToken(User user)
        {
            throw new System.NotImplementedException();
        }

        public bool ShouldRefreshToken(string encodedToken)
        {
            throw new System.NotImplementedException();
        }
    }
}