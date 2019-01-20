using System.Threading.Tasks;
using Sportlance.Common.Models;

namespace Sportlance.Common.Providers
{
    public interface IStorageProvider : IProvier
    {
        Task<StorageFile> DowndloadAsync(string fileName);
        Task<string> UploadAndGetUriAsync(string fileName, StorageFile file);
        Task DeleteAsync(string fileName);
    }
}