using Newtonsoft.Json;

namespace Sportlance.Common.Models
{
    public class ChangePasswordModel: QueueEmailModel
    {
        public ChangePasswordModel()
        {
            Type = QueueEmailTypeEnum.ChangePassword;
        }
        
        public string Email { get; set; }
        
        public string AccessToken { get; set; }
        
        public string RereshToken { get; set; }
        
        public override string ToJson()
        {
            return JsonConvert.SerializeObject(new {Type, AccessToken, RereshToken, Email});
        }
    }
}