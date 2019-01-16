﻿namespace Sportlance.Common.Models
{
    public class ChangeEmailEmailModel: QueueEmailModel
    {
        public ChangeEmailEmailModel()
        {
            Type = QueueEmailTypeEnum.ChangeEmail;
        }
        
        public string OldEmail { get; set; }
        
        public string NewEmail { get; set; }
    }
}