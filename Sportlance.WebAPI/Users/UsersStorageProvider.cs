using Amazon.S3;
using Microsoft.AspNetCore.Hosting;
using Sportlance.Common.Extensions;
using Sportlance.WebAPI.Core.Providers;

namespace Sportlance.WebAPI.Users
{
    public class UsersStorageProvider : AmazonStorageProvider
    {
        public UsersStorageProvider(IAmazonS3 client, IHostingEnvironment env): 
            base(client, $"sportlance-{env.ShortEnvironment()}-users")
        {
        }
    }
}