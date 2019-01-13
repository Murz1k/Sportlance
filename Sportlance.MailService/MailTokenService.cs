using Microsoft.AspNetCore.DataProtection;

namespace Sportlance.MailService
{
    public class TokenService
    {
        public const string MailTokenProtectorPurpose = "MailToken";
        private readonly IDataProtector _dataProtector;

        public TokenService(IDataProtectionProvider dataProtectionProvider)
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