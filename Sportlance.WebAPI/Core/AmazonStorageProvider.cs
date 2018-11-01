using System;
using System.IO;
using System.Threading.Tasks;
using Amazon.Extensions.NETCore.Setup;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;

namespace Sportlance.WebAPI.Core
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
            try
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
            catch (AmazonS3Exception e)
            {
                Console.WriteLine("Error encountered on server. Message:'{0}' when writing an object", e.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine("Unknown encountered on server. Message:'{0}' when writing an object", e.Message);
            }
        }

        public async Task<AzureFile> DowndloadAsync(string fileName)
        {
            try
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
            catch (AmazonS3Exception e)
            {
                Console.WriteLine("Error encountered ***. Message:'{0}' when writing an object", e.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine("Unknown encountered on server. Message:'{0}' when writing an object", e.Message);
            }

            return null;
        }

        public async Task<string> UploadAndGetUriAsync(string fileName, AzureFile file)
        {
            try
            {
                var fileTransferUtility = new TransferUtility(_client);

                using (var stream = new MemoryStream(file.Data))
                {
                    await fileTransferUtility.UploadAsync(stream, _bucketName, fileName);
                }

                return $"{_bucketName}.s3.amazonaws.com/{fileName}";
            }
            catch (AmazonS3Exception e)
            {
                Console.WriteLine("Error encountered on server. Message:'{0}' when writing an object", e.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine("Unknown encountered on server. Message:'{0}' when writing an object", e.Message);
            }

            return null;
        }

        public async Task DeleteAsync(string fileName)
        {
            try
            {
                var deleteObjectRequest = new DeleteObjectRequest
                {
                    BucketName = _bucketName,
                    Key = fileName
                };

                await _client.DeleteObjectAsync(deleteObjectRequest);
            }
            catch (AmazonS3Exception e)
            {
                Console.WriteLine("Error encountered on server. Message:'{0}' when writing an object", e.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine("Unknown encountered on server. Message:'{0}' when writing an object", e.Message);
            }
        }
    }
}