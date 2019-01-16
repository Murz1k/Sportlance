using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Sportlance.Common;

namespace Sportlance.WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebHost.CreateDefaultBuilder(args);

            if (AspNetCoreEnvironment.IsLocal())
            {
                builder.UseSetting("detailedErrors", "true");
                builder.CaptureStartupErrors(true);
            }

            builder.UseStartup<Startup>()
                .Build()
                .Run();
        }
    }
}