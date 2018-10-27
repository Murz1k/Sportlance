using AzureFile = Sportlance.WebAPI.Core.AzureFile;

namespace Sportlance.WebAPI.Entities
{
    public class TeamPhotoItem
    {
        public long Id { get; set; }

        public AzureFile File { get; set; }
    }
}