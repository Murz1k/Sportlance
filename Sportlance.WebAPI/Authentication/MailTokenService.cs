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

        private static string EmailTokenString(string id, string email) => id + email;
        private static string CreateChangePasswordTokenString(string id, string email, string hash) => id + email + hash;

        public string ChangePasswordToken(string id, string email, string hash) => _dataProtector.Protect(
            CreateChangePasswordTokenString(id, email, hash));

        public bool CheckChangePasswordToken(string id, string email, string hash, string token) =>
            _dataProtector.Unprotect(token) == CreateChangePasswordTokenString(id, email, hash);

        public string EncryptEmailConfirmationToken(string id, string email) => _dataProtector.Protect(
            EmailTokenString(id, email));

        public string Protect(string txt) => _dataProtector.Protect(txt);
        public string Unprotect(string txt) => _dataProtector.Unprotect(txt);

        public bool CheckEmailConfirmationToken(string id, string email, string token) =>
            _dataProtector.Unprotect(token) == EmailTokenString(id, email);

        public string EncryptToken(string email) => _dataProtector.Protect(email);

        public string DecryptToken(string token) => _dataProtector.Unprotect(token);
    }
}
