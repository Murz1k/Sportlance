namespace Sportlance.WebAPI.Entities
{
    public class TeamPhotoResponse
    {
        public long Id { get; set; }

        public string PhotoUrl { get; set; }

        public TeamPhotoResponse()
        {

        }

        public TeamPhotoResponse(TeamPhoto photo)
        {
            Id = photo.Id;
            PhotoUrl = photo.PhotoUrl;
        }
    }
}