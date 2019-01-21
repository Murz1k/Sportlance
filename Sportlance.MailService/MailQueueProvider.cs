using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.SQS.Model;
using Microsoft.AspNetCore.Hosting;
using Sportlance.Common.Models;
using Sportlance.Common.Providers;
using Sportlance.Common.Extensions;

namespace Sportlance.MailService
{
    public class MailQueueProvider : AmazonQueueProvider
    {
        private readonly IService _service;

        public MailQueueProvider(IService service, string shortEnvironmentName) : base($"sportlance-{shortEnvironmentName}-mail-queue")
        {
            _service = service;
        }

        public async Task CheckMessagesAsync()
        {
            while (true)
            {
                var messages = await ReceiveMessagesAsync();
                if (messages.Count <= 0) continue;
                DeleteDublicates(messages);

                foreach (var message in messages)
                {
                    try
                    {
                        var jsonObject = QueueEmailModel.FromJson(message.Body);
                        switch (jsonObject.Type)
                        {
                            case QueueEmailTypeEnum.ConfirmRegister:
                                var model1 = (ConfirmRegisterEmailModel) jsonObject;
                                await _service.SendConfirmRegistration(model1.UserId, model1.Email);
                                break;
                            case QueueEmailTypeEnum.ChangeEmail:
                                var model2 = (ChangeEmailEmailModel) jsonObject;
                                await _service.SendUpdateEmail(model2.OldEmail, model2.NewEmail);
                                break;
                            case QueueEmailTypeEnum.ChangePassword:
                                var model3 = (ChangePasswordModel) jsonObject;
                                await _service.SendChangePassword(model3.AccessToken, model3.RereshToken, model3.Email);
                                break;
                            default:
                                model1 = (ConfirmRegisterEmailModel)jsonObject;
                                await _service.SendConfirmRegistration(model1.UserId, model1.Email);
                                break;
                        }
                            
                        await DeleteMessageAsync(message);
                    }
                    catch (Exception)
                    {
                        // ignored
                    }
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