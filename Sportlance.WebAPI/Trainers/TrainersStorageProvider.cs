using Amazon.S3;
using Microsoft.AspNetCore.Hosting;
using Sportlance.Common.Extensions;
using Sportlance.WebAPI.Core.Providers;

namespace Sportlance.WebAPI.Trainers
{
    public class TrainersStorageProvider : AmazonStorageProvider
    {
        public TrainersStorageProvider(IAmazonS3 client, IHostingEnvironment env) : 
            base(client, $"sportlance-{env.ShortEnvironment()}-trainers")
        {
        }
    }
}