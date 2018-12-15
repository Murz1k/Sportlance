using System.ComponentModel.DataAnnotations;
using TeamQuery = Sportlance.WebAPI.Entities.TeamQuery;

namespace Sportlance.WebAPI.Teams.Requests
{
    public class GetTeamsQueryRequest
    {
        public GetTeamsQueryRequest()
        {
            Offset = 0;
            Count = 10;
        }

        public int Offset { get; set; }

        [Range(1, 100)] public int Count { get; set; }

        public TeamQuery ToBLE()
        {
            return new TeamQuery
            {
                Offset = Offset,
                Count = Count
            };
        }
    }
}