namespace Sportlance.DAL.AzureStorage
{
    public class TeamPhotosStorageProvider : AzureStorageProvider
    {
        public TeamPhotosStorageProvider(string connectionString)
            : base(connectionString, "team-photos")
        {
        }
    }
}