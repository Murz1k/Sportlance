namespace Sportlance.WebAPI.Entities
{
    public class TeamPhoto
    {
        public long Id { get; set; }

        public string PhotoUrl { get; set; }

        public long TeamId { get; set; }
        
        public Team Team { get; set; }
    }
}