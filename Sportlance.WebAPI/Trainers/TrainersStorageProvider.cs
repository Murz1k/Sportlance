using Amazon.S3;
using Sportlance.WebAPI.Core;

namespace Sportlance.WebAPI.Trainers
{
    public class TrainersStorageProvider : AmazonStorageProvider
    {
        public TrainersStorageProvider(IAmazonS3 client): base(client, "sportlance-trainers")
        {
        }
    }
}