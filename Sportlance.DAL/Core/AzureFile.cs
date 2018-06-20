using System.IO;

namespace Sportlance.WebAPI.Utilities
{
    public class AzureFile
    {
        public AzureFile(string fileName, byte[] data)
        {
            Data = data;
            FileName = fileName;
            Extension = Path.GetExtension(fileName);
        }

        public byte[] Data { get; }

        public string FileName { get; }

        public string Extension { get; }
    }
}