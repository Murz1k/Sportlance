using System.Collections.Generic;

namespace Sportlance.WebAPI.Authentication.Responses
{
    public class LoginResponse
    {
        public string Token { get; set; }

        public IEnumerable<string> Roles { get; set; }

        public string Email { get; set; }
    }
}
