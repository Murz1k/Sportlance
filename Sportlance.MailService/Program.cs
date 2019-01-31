using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Sportlance.Common;
using Sportlance.Common.Extensions;
using System.Diagnostics;
using System.IO;
using System.Linq;

namespace Sportlance.MailService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var isService = !(Debugger.IsAttached || args.Contains("--console"));

            if (isService)
            {
                var pathToExe = Process.GetCurrentProcess().MainModule.FileName;
                var pathToContentRoot = Path.GetDirectoryName(pathToExe);
                Directory.SetCurrentDirectory(pathToContentRoot);
            }

            var builder = CreateWebHostBuilder(
                args.Where(arg => arg != "--console").ToArray());

            var host = builder.Build();

            if (!AspNetCoreEnvironment.IsLocal())
            {
                builder.AddEbConfig();
            }

            builder.AddAppSettings();

            if (isService)
            {
                host.RunAsCustomService();
            }
            else
            {
                host.Run();
            }
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureLogging((hostingContext, logging) =>
                {
                    logging.AddEventLog();
                })
                .ConfigureAppConfiguration((context, config) =>
                {
                    // Configure the app here.
                })
                .UseStartup<Startup>();

        //public static void Main(string[] args)
        //{
        //    var builder = WebHost.CreateDefaultBuilder(args);

        //    var build = builder.UseStartup<Startup>().Build();

        //    //if (!AspNetCoreEnvironment.IsLocal())
        //    //{
        //    //    builder.AddEbConfig();
        //    //}

        //    //builder.AddAppSettings();

        //    //if (!AspNetCoreEnvironment.IsProduction())
        //    //{
        //    //    builder.UseSetting("detailedErrors", "true");
        //    //    builder.CaptureStartupErrors(true);
        //    //}

        //    //var build = builder.UseStartup<Startup>().Build();

        //    //if (AspNetCoreEnvironment.IsLocal())
        //    //{
        //    //    build.Run();
        //    //}
        //    //else
        //    //{
        //    //    build.RunAsService();
        //    //}
        //}
    }
}