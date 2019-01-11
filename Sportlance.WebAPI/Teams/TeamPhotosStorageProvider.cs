using Amazon.S3;
using Sportlance.WebAPI.Core.Providers;

namespace Sportlance.WebAPI.Teams
{
    public class TeamPhotosStorageProvider : AmazonStorageProvider
    {
        public TeamPhotosStorageProvider(IAmazonS3 client): base(client, "sportlance-team-photos")
        {
        }
    }
}