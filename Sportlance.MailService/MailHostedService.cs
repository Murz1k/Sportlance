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
using Microsoft.Extensions.Logging;

namespace Sportlance.MailService
{
    public class MailHostedService : AmazonQueueProvider, IHostedService
    {
        private readonly IService _service;
        private readonly ILogger _logger;

        private bool _isStarted = false;

        public MailHostedService(ILogger<MailHostedService> logger, IService service, IConfiguration configuration)
            : base($"sportlance-{AspNetCoreEnvironment.ShortEnvironment(configuration["SLEnvironment"])}-mail-queue")
        {
            _service = service;
            _logger = logger;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            await InitializeAsync();
            _logger.LogInformation($"Подключение к очереди {QueueName} успешно.");
            _isStarted = true;
            await CheckMessagesAsync(cancellationToken);
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _isStarted = false;
            return Task.CompletedTask;
        }

        private async Task CheckMessagesAsync(CancellationToken cancellationToken)
        {
            while (_isStarted)
            {
                if (cancellationToken.IsCancellationRequested)
                {
                    _logger.LogInformation($"Получение сообщений прекращено.");
                    return;
                }

                try
                {
                    var messages = await ReceiveMessagesAsync();
                    if (messages.Count <= 0) continue;
                    DeleteDublicates(messages);

                    Task.WaitAll(messages.Select(message => SendMessageAsync(message)).ToArray());

                    Task.WaitAll(messages.Select(message => DeleteMessageAsync(message)).ToArray());
                }
                catch (Exception)
                {
                    // ignored
                }
            }
        }

        private async Task SendMessageAsync(Message message)
        {
            var jsonObject = QueueEmailModel.FromJson(message.Body);
            switch (jsonObject.Type)
            {
                case QueueEmailTypeEnum.ConfirmRegister:
                    var model1 = (ConfirmRegisterEmailModel)jsonObject;
                    await _service.SendConfirmRegistration(model1.UserId, model1.Email, model1.Token);
                    break;
                case QueueEmailTypeEnum.ChangeEmail:
                    var model2 = (ChangeEmailEmailModel)jsonObject;
                    await _service.SendUpdateEmail(model2.OldEmail, model2.NewEmail, model2.Token);
                    break;
                case QueueEmailTypeEnum.ChangePassword:
                    var model3 = (ChangePasswordModel)jsonObject;
                    await _service.SendChangePassword(model3.AccessToken, model3.RereshToken, model3.Email);
                    break;
                default:
                    model1 = (ConfirmRegisterEmailModel)jsonObject;
                    await _service.SendConfirmRegistration(model1.UserId, model1.Email, model1.Token);
                    break;
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