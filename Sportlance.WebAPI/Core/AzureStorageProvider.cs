using System.IO;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace Sportlance.WebAPI.Core
{
    public abstract class AzureStorageProvider : IStorageProvider
    {
        private readonly string _containerName;
        private readonly CloudBlobClient _client;

        protected AzureStorageProvider(string connectionString, string containerName)
        {
            _containerName = containerName;
            var storageAccount = CloudStorageAccount.Parse(connectionString);
            _client = storageAccount.CreateCloudBlobClient();
        }

        public async Task InitializeAsync()
        {
            var container = _client.GetContainerReference(_containerName);
            await container.CreateIfNotExistsAsync();

            await SetPermissions(container);
        }

        private async Task SetPermissions(CloudBlobContainer container)
        {
            var permissions = await container.GetPermissionsAsync();
            permissions.PublicAccess = BlobContainerPublicAccessType.Blob;
            await container.SetPermissionsAsync(permissions);
        }

        public async Task<AzureFile> DowndloadAsync(string fileName)
        {
            var blockBlob = _client.GetContainerReference(_containerName).GetBlockBlobReference(fileName);
            if (!await blockBlob.ExistsAsync())
            {
                return null;
            }

            using (var stream = new MemoryStream())
            {
                await blockBlob.DownloadToStreamAsync(stream);
                return new AzureFile(fileName, stream.ToArray());
            }
        }

        public async Task<string> UploadAndGetUriAsync(string fileName, AzureFile file)
        {
            var blockBlob = _client.GetContainerReference(_containerName).GetBlockBlobReference(fileName);
            await blockBlob.DeleteIfExistsAsync();
            await blockBlob.UploadFromByteArrayAsync(file.Data, 0, file.Data.Length);
            return blockBlob.Uri.AbsoluteUri;
        }

        public Task DeleteAsync(string fileName)
        {
            var blockBlob = _client.GetContainerReference(_containerName).GetBlockBlobReference(fileName);
            return blockBlob.DeleteIfExistsAsync();
        }
    }
}