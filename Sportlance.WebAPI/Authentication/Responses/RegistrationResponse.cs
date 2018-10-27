namespace Sportlance.WebAPI.Authentication.Responses
{
    public class RegistrationResponse
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string IsEmailConfirm { get; set; }
    }
}