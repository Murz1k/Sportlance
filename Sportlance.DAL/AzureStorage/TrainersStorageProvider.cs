namespace Sportlance.DAL.AzureStorage
{
    public class TrainersStorageProvider : AzureStorageProvider
    {
        public TrainersStorageProvider(AzureStorageOptions azureStorageOptions)
            : base(azureStorageOptions, "trainers")
        {
        }
    }
}