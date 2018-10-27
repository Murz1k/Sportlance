namespace Sportlance.WebAPI.Teams
{
    public class TeamPhotosStorageProvider : WebAPI.Core.AzureStorageProvider
    {
        public TeamPhotosStorageProvider(string connectionString)
            : base(connectionString, "team-photos")
        {
        }
    }
}