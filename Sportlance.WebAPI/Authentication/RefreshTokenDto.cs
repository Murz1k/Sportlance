using System.Collections.Generic;

namespace Sportlance.WebAPI.Authentication
{
    public class RefreshTokenDto
    {
        public string Token { get; set; }

        public IEnumerable<string> Roles { get; set; }
    }
}