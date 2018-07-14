using Microsoft.AspNetCore.Http;

namespace Sportlance.WebAPI.Requests
{
    public class ChangeTeamPhotoRequest
    {
        public long TeamId { get; set; }
        
        public IFormFile photo { get; set; }
    }
}