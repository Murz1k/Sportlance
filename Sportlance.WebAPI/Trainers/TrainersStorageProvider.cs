using Amazon.S3;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Core.Providers;

namespace Sportlance.WebAPI.Trainers
{
    public class TrainersStorageProvider : AmazonStorageProvider
    {
        public TrainersStorageProvider(IAmazonS3 client): base(client, "sportlance-trainers")
        {
        }
    }
}