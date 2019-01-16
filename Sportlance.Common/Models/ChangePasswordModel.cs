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
    }
}