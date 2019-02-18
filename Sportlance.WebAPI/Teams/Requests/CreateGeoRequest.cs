namespace Sportlance.WebAPI.Teams.Requests
{
    public class CreateGeoRequest
    {
        public string Latitude { get; set; }

        public string Longitude { get; set; }

        public short Zoom { get; set; }
    }
}
