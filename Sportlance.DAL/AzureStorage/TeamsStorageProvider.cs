namespace Sportlance.DAL.AzureStorage
{
    public class TeamsStorageProvider : AzureStorageProvider
    {
        public TeamsStorageProvider(AzureStorageOptions azureStorageOptions)
            : base(azureStorageOptions, "teams")
        {
        }
    }
}