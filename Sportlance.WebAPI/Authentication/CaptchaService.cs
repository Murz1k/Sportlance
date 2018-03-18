﻿using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Sportlance.WebAPI.Authentication.Responses;
using Sportlance.WebAPI.Errors;
using Sportlance.WebAPI.Exceptions;
using Sportlance.WebAPI.Options;
using Sportlance.WebAPI.Utilities;

namespace Sportlance.WebAPI.Authentication
{
    public class CaptchaService
    {
        private readonly string _secretKey;
        private readonly HttpClient _client;

        public CaptchaService(IOptions<FrontendOptions> config)
        {
            _secretKey = config.Value.CaptchaSecretKey;
            _client = new HttpClient();
        }

        public async Task<bool> IsCaptchaCodeValidAsync(string token)
        {
            var googleReply = await _client.GetAsync($"https://www.google.com/recaptcha/api/siteverify?secret={_secretKey}&response={token}");

            if (!googleReply.IsSuccessStatusCode)
            {
                throw new AppErrorException(new AppError(ErrorCode.ServerError, null, Txt.NoResponseFromGoogleApi));
            }
            var replyAsString = await googleReply.Content.ReadAsStringAsync();

            return JsonConvert.DeserializeObject<RecaptchaResponse>(replyAsString).Success;
        }
    }
}
