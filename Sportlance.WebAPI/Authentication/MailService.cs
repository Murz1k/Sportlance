using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using Sportlance.WebAPI.Options;
using Sportlance.WebAPI.Utilities;
using MailKit.Net.Smtp;
using MimeKit;
using Sportlance.WebAPI.Core;

namespace Sportlance.WebAPI.Authentication
{
    public class MailService
    {
        private readonly SmtpOptions _smtpOptions;
        private readonly SiteUrls _siteUrls;
        private readonly MailTokenService _mailTokenService;
        private readonly IHostingEnvironment _env;

        public MailService(
            IOptions<SmtpOptions> smtpOptions,
            IOptions<SiteOptions> frontendOptions,
            MailTokenService mailTokenService,
            IHostingEnvironment env)
        {
            _mailTokenService = mailTokenService;
            _env = env;
            _smtpOptions = smtpOptions.Value;
            _siteUrls = new SiteUrls(frontendOptions.Value.Root);
        }

        public async Task SendMessage(string to, string subject, string body)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_smtpOptions.UserName));
            message.To.Add(new MailboxAddress(to));
            message.Subject = subject;

            var bodyBuilder = new BodyBuilder { HtmlBody = body };
            message.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                client.Connect(_smtpOptions.Host, _smtpOptions.Port, _smtpOptions.UseSsl);

                client.AuthenticationMechanisms.Remove("XOAUTH2");

                client.Authenticate(_smtpOptions.UserName, _smtpOptions.Password);

                await client.SendAsync(message);

                client.Disconnect(true);
            }
        }

        public async Task SendConfirmRegistration(long userId, string email)
        {
            var token = _mailTokenService.EncryptEmailConfirmationToken(userId.ToString(), email);

            var template = await ReadEmailTemplate();

            template = template
                .Replace("{SUBJECT}", "Welcome to the IcoLab Fund!")
                .Replace("{BODY}", "Click on the button below to complete your registration.")
                .Replace("{BUTTON}", "COMPLETE REGISTRATION")
                .Replace("{BUTTONHREF}", _siteUrls.GetConfirmRegistration(userId, token));

            await SendMessage(email, Txt.EmailConfirmation, template);
        }

        public async Task SendChangePassword(long id, string email, string hash)
        {
            var token = _mailTokenService.ChangePasswordToken(id.ToString(), email, hash);
            var template = await ReadEmailTemplate();

            template = template
                .Replace("{SUBJECT}", "Password change")
                .Replace("{BODY}", "Click on the button below to set a new password.")
                .Replace("{BUTTON}", "CHANGE")
                .Replace("{BUTTONHREF}", _siteUrls.GetChangePassword(id, token));
            await SendMessage(email, Txt.ChangePassword, template);
        }

        public async Task SendUpdateEmail(string email, string newEmail)
        {
            var token = _mailTokenService.Protect(newEmail);
            var template = await ReadEmailTemplate();

            template = template
                .Replace("{SUBJECT}", "Password change")
                .Replace("{BODY}", $"Click on the button below to change your email {email} to {newEmail}")
                .Replace("{BUTTON}", "Update email")
                .Replace("{BUTTONHREF}", _siteUrls.GetUpdateEmail(token));
            await SendMessage(email, Txt.UpdateEmail, template);
        }

        private async Task<string> ReadEmailTemplate()
        {
            using (var reader = File.OpenText(_env.ContentRootPath + "/email/index.html"))
            {
                return await reader.ReadToEndAsync();
            }
        }
    }
}
