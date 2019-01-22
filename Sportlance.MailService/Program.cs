using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.WindowsServices;
using Sportlance.Common;
using Sportlance.Common.Extensions;

namespace Sportlance.MailService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebHost.CreateDefaultBuilder(args);

            if (!AspNetCoreEnvironment.IsLocal())
            {
                builder.AddEbConfig();
            }

            builder.AddAppSettings();

            if (!AspNetCoreEnvironment.IsProduction())
            {
                builder.UseSetting("detailedErrors", "true");
                builder.CaptureStartupErrors(true);
            }

            var build = builder.UseStartup<Startup>().Build();
            
            build.Run();
        }
    }
}