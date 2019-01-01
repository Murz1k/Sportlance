using System.Threading.Tasks;

namespace Sportlance.WebAPI.Authentication
{
    public interface IMailService
    {
        Task<string> SendConfirmRegistration(long userId, string email);
        Task SendChangePassword(string accessToken, string refreshToken, string email);
        Task SendUpdateEmail(string email, string newEmail);
    }
}