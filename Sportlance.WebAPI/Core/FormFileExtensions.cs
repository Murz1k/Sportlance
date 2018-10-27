using System.IO;
using Microsoft.AspNetCore.Http;

namespace Sportlance.WebAPI.Core
{
    public static class FormFileExtensions
    {
        public static AzureFile ToAzureFile(this IFormFile formFile)
        {
            using (var stream = formFile.OpenReadStream())
            {
                using (var memoryStream = new MemoryStream())
                {
                    stream.CopyTo(memoryStream);
                    return new AzureFile(formFile.FileName, memoryStream.GetBuffer());
                }
            }
        }  
    }
}