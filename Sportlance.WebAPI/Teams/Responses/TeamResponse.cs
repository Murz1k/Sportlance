using Sportlance.WebAPI.Teams.Responses;
using System.Collections.Generic;
using System.Linq;

namespace Sportlance.WebAPI.Entities
{
    public class TeamResponse
    {
        public long Id { get; set; }

        public long AuthorId { get; set; }

        public string Title { get; set; }

        public string SubTitle { get; set; }
        
        public string PhotoUrl { get; set; }

        public string BackgroundUrl { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public string Address { get; set; }

        public double? Score { get; set; }

        public string About { get; set; }

        public string PhoneNumber { get; set; }

        public GetGeoResponse Geo { get; set; }

        public IEnumerable<TeamServiceResponse> Services { get; set; }

        public TeamResponse()
        {

        }

        public TeamResponse(Team team)
        {
            Id = team.Id;
            AuthorId = team.AuthorId;
            Title = team.Title;
            SubTitle = team.SubTitle;
            PhotoUrl = team.PhotoUrl;
            BackgroundUrl = team.BackgroundUrl;
            Country = team.Country;
            City = team.City;
            Address = team.Address;
            About = team.About;
            PhoneNumber = team.PhoneNumber;
            Services = team.Services.Select(i => new TeamServiceResponse(i));
            Geo = new GetGeoResponse
            {
                Latitude = team.Latitude,
                Longitude = team.Longitude,
                Zoom = team.Zoom
            };
        }
    }
}