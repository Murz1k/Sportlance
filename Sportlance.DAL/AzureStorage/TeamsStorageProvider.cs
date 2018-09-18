namespace Sportlance.DAL.AzureStorage
{
    public class TeamsStorageProvider : AzureStorageProvider
    {
        public TeamsStorageProvider(string connectionString)
            : base(connectionString, "teams")
        {
        }
    }
}