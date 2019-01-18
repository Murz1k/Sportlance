using System.Collections.Generic;
using System.Threading.Tasks;
using Amazon.SQS;
using Amazon.SQS.Model;

namespace Sportlance.Common.Providers
{
    public class AmazonQueueProvider
    {
        private AmazonSQSClient _sqsClient;
        private string _queueUrl;
        private readonly string _queueName;

        public AmazonQueueProvider(string queueName)
        {
            _queueName = queueName.ToLower();
        }

        public async Task InitializeAsync()
        {
            var sqsConfig = new AmazonSQSConfig { ServiceURL = "http://sqs.us-east-1.amazonaws.com" };

            _sqsClient = new AmazonSQSClient(sqsConfig);

            var url = await GetQueueUrlAsync();
            if (url == null)
            {
                var createQueueRequest = new CreateQueueRequest { QueueName = _queueName };

                var attrs = new Dictionary<string, string> { { QueueAttributeName.VisibilityTimeout, "10" } };
                createQueueRequest.Attributes = attrs;
                var createQueueResponse = await _sqsClient.CreateQueueAsync(createQueueRequest);
                _queueUrl = createQueueResponse.QueueUrl;
            }
            else
            {
                _queueUrl = url;
            }
        }

        public async Task<string> GetQueueUrlAsync()
        {
            var request = new GetQueueUrlRequest
            {
                QueueName = _queueName
            };

            try
            {
                GetQueueUrlResponse response = await _sqsClient.GetQueueUrlAsync(request);

                return response.QueueUrl;
            }
            catch (QueueDoesNotExistException)
            {
                return null;
            }
        }

        public async Task SendMessageAsync(string message)
        {
            var sendMessageRequest = new SendMessageRequest
            {
                QueueUrl = _queueUrl,
                MessageBody = message
            };

            await _sqsClient.SendMessageAsync(sendMessageRequest);
        }

        public async Task<List<Message>> ReceiveMessagesAsync()
        {
            var receiveMessageRequest = new ReceiveMessageRequest { QueueUrl = _queueUrl };

            var receiveMessageResponse = await _sqsClient.ReceiveMessageAsync(receiveMessageRequest);
            return receiveMessageResponse.Messages;
        }

        public async Task DeleteMessageAsync(Message message)
        {
            var deleteMessageRequest = new DeleteMessageRequest
            {
                QueueUrl = _queueUrl,
                ReceiptHandle = message.ReceiptHandle
            };

            await _sqsClient.DeleteMessageAsync(deleteMessageRequest);
        }
    }
}