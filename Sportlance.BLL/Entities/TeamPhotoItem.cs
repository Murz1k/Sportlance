using Sportlance.WebAPI.Utilities;

namespace Sportlance.BLL.Entities
{
    public class TeamPhotoItem
    {
        public long Id { get; set; }

        public AzureFile File { get; set; }
    }
}