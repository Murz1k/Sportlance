using Amazon.Extensions.NETCore.Setup;
using Amazon.Runtime;

namespace Sportlance.Common.Options
{
    public class AmazonOptions : AWSOptions
    {
        public string AccessKey { get; set; }

        public string SecretKey { get; set; }

        public void UseBasicCredentials()
        {
            Credentials = new BasicAWSCredentials(AccessKey, SecretKey);
        }
    }
}
