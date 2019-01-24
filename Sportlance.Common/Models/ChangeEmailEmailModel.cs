using Newtonsoft.Json;

namespace Sportlance.Common.Models
{
    public class ChangeEmailEmailModel: QueueEmailModel
    {
        public ChangeEmailEmailModel()
        {
            Type = QueueEmailTypeEnum.ChangeEmail;
        }
        
        public string OldEmail { get; set; }
        
        public string NewEmail { get; set; }

        public string Token { get; set; }

        public override string ToJson()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}