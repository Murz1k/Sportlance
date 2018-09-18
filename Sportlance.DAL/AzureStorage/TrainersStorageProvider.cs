namespace Sportlance.DAL.AzureStorage
{
    public class TrainersStorageProvider : AzureStorageProvider
    {
        public TrainersStorageProvider(string connectionString)
            : base(connectionString, "trainers")
        {
        }
    }
}