using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace Sportlance.MailService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            WebHost.CreateDefaultBuilder(args)
                .UseSetting("detailedErrors", "true")
                .UseStartup<Startup>()
                .CaptureStartupErrors(true)
                .Build()
                .Run();
        }
    }
}