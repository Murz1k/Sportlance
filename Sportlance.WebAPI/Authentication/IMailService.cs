using System.Threading.Tasks;

namespace Sportlance.WebAPI.Authentication
{
    public interface IMailService
    {
        Task SendMessage(string to, string subject, string body);
        Task<string> SendConfirmRegistration(long userId, string email);
        Task SendChangePassword(long id, string email, string hash);
        Task SendUpdateEmail(string email, string newEmail);
    }
}