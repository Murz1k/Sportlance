using Microsoft.AspNetCore.DataProtection;

namespace Sportlance.WebAPI.Authentication
{
    public class MailTokenService
    {
        public const string MailTokenProtectorPurpose = "MailToken";
        private readonly IDataProtector _dataProtector;

        public MailTokenService(IDataProtectionProvider dataProtectionProvider)
        {
            _dataProtector = dataProtectionProvider.CreateProtector(MailTokenProtectorPurpose);
        }
        
        public string EncryptToken(string email)
        {
            return _dataProtector.Protect(email);
        }

        public string DecryptToken(string token)
        {
            return _dataProtector.Unprotect(token);
        }
    }
}