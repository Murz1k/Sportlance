namespace Sportlance.WebAPI.Teams
{
    public class TeamsStorageProvider : WebAPI.Core.AzureStorageProvider
    {
        public TeamsStorageProvider(string connectionString)
            : base(connectionString, "teams")
        {
        }
    }
}