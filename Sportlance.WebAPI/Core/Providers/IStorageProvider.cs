using System.Threading.Tasks;

namespace Sportlance.WebAPI.Core
{
    public interface IStorageProvider
    {
        Task InitializeAsync();
        Task<AzureFile> DowndloadAsync(string fileName);
        Task<string> UploadAndGetUriAsync(string fileName, AzureFile file);
        Task DeleteAsync(string fileName);
    }
}