﻿using Newtonsoft.Json;

namespace Sportlance.Common.Models
{
    public class ConfirmRegisterEmailModel : QueueEmailModel
    {
        public ConfirmRegisterEmailModel()
        {
            Type = QueueEmailTypeEnum.ConfirmRegister;
        }

        public long UserId { get; set; }

        public string Email { get; set; }
        
        public override string ToJson()
        {
            return JsonConvert.SerializeObject(new {Type, UserId, Email});
        }
    }
}