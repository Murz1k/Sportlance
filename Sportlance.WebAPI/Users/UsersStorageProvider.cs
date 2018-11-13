using Amazon.S3;
using Sportlance.WebAPI.Core;

namespace Sportlance.WebAPI.Users
{
    public class UsersStorageProvider : AmazonStorageProvider
    {
        public UsersStorageProvider(IAmazonS3 client): base(client, "sportlance-users")
        {
        }
    }
}