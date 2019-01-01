using System.Threading.Tasks;

namespace Sportlance.WebAPI.Authentication
{
    public class MockMailService: IMailService
    {
        public Task SendMessage(string to, string subject, string body)
        {
            throw new System.NotImplementedException();
        }

        public Task<string> SendConfirmRegistration(long userId, string email)
        {
            return null;
        }

        public Task SendChangePassword(string accessToken, string refreshToken, string email)
        {
            throw new System.NotImplementedException();
        }

        public Task SendUpdateEmail(string email, string newEmail)
        {
            throw new System.NotImplementedException();
        }
    }
}