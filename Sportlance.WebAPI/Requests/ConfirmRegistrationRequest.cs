namespace Sportlance.WebAPI.Requests
{
    public class ConfirmRegistrationRequest
    {
        public long UserId { get; set; }

        public string Token { get; set; }
    }
}