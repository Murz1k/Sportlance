using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Teams.Responses
{
    public class TeamServiceResponse
    {
        public long Id { get; set; }

        public long AuthorId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Duration { get; set; }

        public long Price { get; set; }

        public TeamServiceResponse()
        {

        }

        public TeamServiceResponse(TeamService service)
        {
            Id = service.Id;
            AuthorId = service.Team.AuthorId;
            Name = service.Name;
            Description = service.Description;
            Duration = service.Duration;
            Price = service.Price;
        }
    }
}
