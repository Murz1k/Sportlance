using Newtonsoft.Json;

namespace Sportlance.Common.Models
{
    public abstract class QueueEmailModel
    {
        public QueueEmailTypeEnum Type { get; set; }

        public virtual string ToJson()
        {
            return "";
        }

        public static QueueEmailModel FromJson(string json)
        {
            dynamic obj = JsonConvert.DeserializeObject(json);
            switch (obj.Type)
            {
                default:
                    return JsonConvert.DeserializeObject<ConfirmRegisterEmailModel>(json);
                case QueueEmailTypeEnum.ConfirmRegister:
                    return JsonConvert.DeserializeObject<ConfirmRegisterEmailModel>(json);
                case QueueEmailTypeEnum.ChangeEmail:
                    return JsonConvert.DeserializeObject<ChangeEmailEmailModel>(json);
                case QueueEmailTypeEnum.ChangePassword:
                    return JsonConvert.DeserializeObject<ChangePasswordModel>(json);
            }
        }
    }
}