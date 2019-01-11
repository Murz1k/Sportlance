using Amazon.S3;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Core.Providers;

namespace Sportlance.WebAPI.Users
{
    public class UsersStorageProvider : AmazonStorageProvider
    {
        public UsersStorageProvider(IAmazonS3 client): base(client, "sportlance-users")
        {
        }
    }
}