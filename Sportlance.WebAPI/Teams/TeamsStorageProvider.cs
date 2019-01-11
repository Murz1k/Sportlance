using Amazon.S3;
using Sportlance.WebAPI.Core.Providers;

namespace Sportlance.WebAPI.Teams
{
    public class TeamsStorageProvider : AmazonStorageProvider
    {
        public TeamsStorageProvider(IAmazonS3 client): base(client, "sportlance-teams")
        {
        }
    }
}