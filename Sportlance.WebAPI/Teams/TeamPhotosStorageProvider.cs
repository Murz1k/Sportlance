using Amazon.S3;
using Microsoft.AspNetCore.Hosting;
using Sportlance.Common.Extensions;
using Sportlance.Common.Providers;

namespace Sportlance.WebAPI.Teams
{
    public class TeamPhotosStorageProvider : AmazonStorageProvider
    {
        public TeamPhotosStorageProvider(IAmazonS3 client, IHostingEnvironment env): 
            base(client, $"sportlance-{env.ShortEnvironment()}-team-photos")
        {
        }
    }
}