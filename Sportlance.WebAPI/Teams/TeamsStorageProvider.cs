using Amazon.S3;

namespace Sportlance.WebAPI.Teams
{
    public class TeamsStorageProvider : Core.AmazonStorageProvider
    {
        public TeamsStorageProvider(IAmazonS3 client): base(client, "sportlance-teams")
        {
        }
    }
}