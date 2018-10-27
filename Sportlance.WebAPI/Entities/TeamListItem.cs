namespace Sportlance.WebAPI.Entities
{
    public class TeamListItem
    {
        public long Id { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public double? Score { get; set; }

        public string Title { get; set; }

        public string SubTitle { get; set; }

        public string About { get; set; }
        
        public string PhotoUrl { get; set; }

        public string PhoneNumber { get; set; }
    }
}