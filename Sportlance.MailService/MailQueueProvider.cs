using System;
using System.Threading.Tasks;
using Sportlance.Common.Providers;

namespace Sportlance.MailService
{
    public class MailQueueProvider : AmazonQueueProvider
    {
        private readonly IService _service;

        public MailQueueProvider(IService service) : base("mail-queue")
        {
            _service = service;
        }

        public async Task CheckMessagesAsync()
        {
            while (true)
            {
                var messages = await ReceiveMessagesAsync();
                if (messages.Count > 0)
                {
                    foreach (var message in messages)
                    {
                        try
                        {
                            var body = message.Body;
                            var userId = long.Parse(body.Split(',')[0]);
                            var email = body.Split(',')[1];
                            await _service.SendConfirmRegistration(userId, email);
                            await DeleteMessageAsync(message);
                        }
                        catch (Exception e)
                        {

                        }
                    }
                }
            }
        }
    }
}