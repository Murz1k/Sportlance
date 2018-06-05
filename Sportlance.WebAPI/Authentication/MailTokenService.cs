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

        private static string EmailTokenString(string id, string email)
        {
            return id + email;
        }

        private static string CreateChangePasswordTokenString(string id, string email, string hash)
        {
            return id + email + hash;
        }

        public string ChangePasswordToken(string id, string email, string hash)
        {
            return _dataProtector.Protect(
                CreateChangePasswordTokenString(id, email, hash));
        }

        public bool CheckChangePasswordToken(string id, string email, string hash, string token)
        {
            return _dataProtector.Unprotect(token) == CreateChangePasswordTokenString(id, email, hash);
        }

        public string EncryptEmailConfirmationToken(string id, string email)
        {
            return _dataProtector.Protect(
                EmailTokenString(id, email));
        }

        public string Protect(string txt)
        {
            return _dataProtector.Protect(txt);
        }

        public string Unprotect(string txt)
        {
            return _dataProtector.Unprotect(txt);
        }

        public bool CheckEmailConfirmationToken(string id, string email, string token)
        {
            return _dataProtector.Unprotect(token) == EmailTokenString(id, email);
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