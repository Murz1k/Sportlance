using System;
using System.IO;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;

namespace Sportlance.WebAPI.Core.Providers
{
    public class AmazonStorageProvider : IStorageProvider
    {
        private readonly string _bucketName;
        private static IAmazonS3 _client;

        protected AmazonStorageProvider(IAmazonS3 client, string bucketName)
        {
            _bucketName = bucketName;
            _client = client;
        }

        public async Task InitializeAsync()
        {
            if (!await _client.DoesS3BucketExistAsync(_bucketName))
            {
                var putBucketRequest = new PutBucketRequest
                {
                    BucketName = _bucketName,
                    UseClientRegion = true
                };

                await _client.PutBucketAsync(putBucketRequest);
            }
        }

        public async Task<AzureFile> DowndloadAsync(string fileName)
        {
            var request = new GetObjectRequest
            {
                BucketName = _bucketName,
                Key = fileName
            };
            using (var response = await _client.GetObjectAsync(request))
            using (var stream = new MemoryStream())
            {
                await response.ResponseStream.CopyToAsync(stream);
                return new AzureFile(fileName, stream.ToArray());
            }
        }

        public async Task<string> UploadAndGetUriAsync(string fileName, AzureFile file)
        {
            var fileTransferUtility = new TransferUtility(_client);

            using (var stream = new MemoryStream(file.Data))
            {
                var uploadRequest = new TransferUtilityUploadRequest
                {
                    InputStream = stream,
                    Key = fileName,
                    BucketName = _bucketName,
                    CannedACL = S3CannedACL.PublicRead
                };

                await fileTransferUtility.UploadAsync(uploadRequest);
            }

            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = fileName,
                Protocol = Protocol.HTTPS,
                Expires = DateTime.UtcNow
            };
            return _client.GetPreSignedURL(request).Split('?')[0];
        }

        public async Task DeleteAsync(string fileName)
        {
            var deleteObjectRequest = new DeleteObjectRequest
            {
                BucketName = _bucketName,
                Key = fileName
            };

            await _client.DeleteObjectAsync(deleteObjectRequest);
        }
    }
}