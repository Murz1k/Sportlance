using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.SQS.Model;
using Sportlance.Common.Models;
using Sportlance.Common.Providers;
using Microsoft.Extensions.Hosting;
using System.Threading;
using Sportlance.Common;
using Microsoft.Extensions.Configuration;

namespace Sportlance.MailService
{
    public class MailHostedService : AmazonQueueProvider, IHostedService
    {
        private readonly IService _service;

        public MailHostedService(IService service, IConfiguration configuration)
            : base($"sportlance-{AspNetCoreEnvironment.ShortEnvironment(configuration["SLEnvironment"])}-mail-queue")
        {
            _service = service;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            await InitializeAsync();
            await CheckMessagesAsync(cancellationToken);
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        private async Task CheckMessagesAsync(CancellationToken cancellationToken)
        {
            while (true)
            {
                if (cancellationToken.IsCancellationRequested)
                {
                    return;
                }

                try
                {
                    var messages = await ReceiveMessagesAsync();
                    if (messages.Count <= 0) continue;
                    DeleteDublicates(messages);

                    foreach (var message in messages)
                    {
                        var jsonObject = QueueEmailModel.FromJson(message.Body);
                        switch (jsonObject.Type)
                        {
                            case QueueEmailTypeEnum.ConfirmRegister:
                                var model1 = (ConfirmRegisterEmailModel)jsonObject;
                                await _service.SendConfirmRegistration(model1.UserId, model1.Email);
                                break;
                            case QueueEmailTypeEnum.ChangeEmail:
                                var model2 = (ChangeEmailEmailModel)jsonObject;
                                await _service.SendUpdateEmail(model2.OldEmail, model2.NewEmail);
                                break;
                            case QueueEmailTypeEnum.ChangePassword:
                                var model3 = (ChangePasswordModel)jsonObject;
                                await _service.SendChangePassword(model3.AccessToken, model3.RereshToken, model3.Email);
                                break;
                            default:
                                model1 = (ConfirmRegisterEmailModel)jsonObject;
                                await _service.SendConfirmRegistration(model1.UserId, model1.Email);
                                break;
                        }

                        await DeleteMessageAsync(message);
                    }
                }
                catch (Exception)
                {
                    // ignored
                }
            }
        }

        private static void DeleteDublicates(List<Message> messages)
        {
            var distinctMessages = messages
                .GroupBy(m => m.Body)
                .Select(g => g.First())
                .ToList();

            messages = distinctMessages;
        }
    }
}