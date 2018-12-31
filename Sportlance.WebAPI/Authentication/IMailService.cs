using System.Threading.Tasks;

namespace Sportlance.WebAPI.Authentication
{
    public interface IMailService
    {
        Task<string> SendConfirmRegistration(long userId, string email);
        Task SendChangePassword(long id, string email);
        Task SendUpdateEmail(string email, string newEmail);
    }
}