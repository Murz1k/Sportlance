namespace Sportlance.WebAPI.Teams.Requests
{
    public class UpdateTeamServiceRequest
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string Duration { get; set; }

        public long Price { get; set; }
    }
}
