using System.Threading.Tasks;

namespace Sportlance.MailService
{
    public interface IService
    {
        Task<string> SendConfirmRegistration(long userId, string email, string token);
        Task SendChangePassword(string accessToken, string refreshToken, string email);
        Task SendUpdateEmail(string email, string newEmail, string token);
    }
}