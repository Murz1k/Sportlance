namespace Sportlance.WebAPI.Requests
{
    public class ConfirmRegistrationRequest
    {
        public int UserId { get; set; }

        public string Token { get; set; }
    }
}