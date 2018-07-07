namespace Sportlance.DAL.AzureStorage
{
    public class TeamPhotosStorageProvider : AzureStorageProvider
    {
        public TeamPhotosStorageProvider(AzureStorageOptions azureStorageOptions)
            : base(azureStorageOptions, "team-photos")
        {
        }
    }
}