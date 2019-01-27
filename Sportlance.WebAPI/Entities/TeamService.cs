namespace Sportlance.WebAPI.Entities
{
    public class TeamService
    {
        public long Id { get; set; }

        public long TeamId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Duration { get; set; }

        public long Price { get; set; }

        public bool IsDeleted { get; set; }

        public Team Team { get; set; }
    }
}
