using AzureStorageProvider = Sportlance.WebAPI.Core.AzureStorageProvider;

namespace Sportlance.WebAPI.Trainers
{
    public class TrainersStorageProvider : AzureStorageProvider
    {
        public TrainersStorageProvider(string connectionString)
            : base(connectionString, "trainers")
        {
        }
    }
}