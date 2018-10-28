namespace Sportlance.WebAPI.Options
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

        public string GetChangePassword(long userId, string token)
        {
            return $"{_root}/account/updatepassword/{userId}/{token}";
        }

        public string GetUpdateEmail(string token)
        {
            return $"{_root}/account/updateemail/{token}";
        }
    }
}