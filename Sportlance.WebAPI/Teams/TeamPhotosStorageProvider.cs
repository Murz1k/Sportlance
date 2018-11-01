using Amazon.S3;

namespace Sportlance.WebAPI.Teams
{
    public class TeamPhotosStorageProvider : Core.AmazonStorageProvider
    {
        public TeamPhotosStorageProvider(IAmazonS3 client): base(client, "sportlance-team-photos")
        {
        }
    }
}