using System.IO;
using Microsoft.AspNetCore.Http;
using Sportlance.Common.Models;

namespace Sportlance.Common.Extensions
{
    public static class FormFileExtensions
    {
        public static StorageFile ToStorageFile(this IFormFile formFile)
        {
            using (var stream = formFile.OpenReadStream())
            {
                using (var memoryStream = new MemoryStream())
                {
                    stream.CopyTo(memoryStream);
                    return new StorageFile(formFile.FileName, memoryStream.GetBuffer());
                }
            }
        }  
    }
}