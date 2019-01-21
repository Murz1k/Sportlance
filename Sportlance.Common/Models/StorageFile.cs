using System.IO;

namespace Sportlance.Common.Models
{
    public class StorageFile
    {
        public StorageFile(string fileName, byte[] data)
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