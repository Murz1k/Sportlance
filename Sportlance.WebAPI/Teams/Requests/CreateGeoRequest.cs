namespace Sportlance.WebAPI.Teams.Requests
{
    public class CreateGeoRequest
    {
        public decimal Latitude { get; set; }

        public decimal Longitude { get; set; }

        public short Zoom { get; set; }
    }
}
