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

        public double? Score { get; set; }

        public string About { get; set; }

        public string PhoneNumber { get; set; }

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
            About = team.About;
            PhoneNumber = team.PhoneNumber;
        }
    }
}