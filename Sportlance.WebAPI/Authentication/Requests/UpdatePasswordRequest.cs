namespace Sportlance.WebAPI.Authentication.Requests
{
    public class UpdatePasswordRequest
    {
        public string NewPassword { get; set; }
        
        public string ConfirmPassword { get; set; }
    }
}