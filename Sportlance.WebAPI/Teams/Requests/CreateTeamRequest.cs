using Microsoft.AspNetCore.Http;

namespace Sportlance.WebAPI.Teams.Requests
{
    public class CreateTeamRequest
    {
        public string Title { get; set; }
        
        public string SubTitle { get; set; }
        
        public string PhoneNumber { get; set; }
        
        public string About { get; set; }

        public CreateGeoRequest Geo { get; set; }

        public string City { get; set; }

        public string Address { get; set; }

        public string Country { get; set; }
        
        public IFormFile Photo { get; set; }
    }
}