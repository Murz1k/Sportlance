namespace Sportlance.WebAPI.Entities
{
    public class TeamQuery
    {
        public TeamQuery()
        {
            Offset = 0;
            Count = 10;
        }

        public int Offset { get; set; }

        public int Count { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public string LeftUpperCornerLongitude { get; set; }

        public string LeftUpperCornerLatitude { get; set; }

        public string RightLowerCornerLongitude { get; set; }

        public string RightLowerCornerLatitude { get; set; }
    }
}