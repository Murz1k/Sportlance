namespace Sportlance.MailService
{
    public class SiteUrls
    {
        private readonly string _root;

        public SiteUrls(string root)
        {
            _root = root;
        }

        public string GetConfirmRegistration(long userId, string token)
        {
            return $"{_root}/auth/confirm/{userId}/{token}";
        }

        public string GetChangePassword(string accessToken, string refreshToken)
        {
            return $"{_root}/account/reset-password?accessToken={accessToken}&refreshToken={refreshToken}";
        }

        public string GetUpdateEmail(string token)
        {
            return $"{_root}/account/updateemail/{token}";
        }
    }
}