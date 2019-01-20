using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Sportlance.Common;
using System;
using System.Linq;

namespace Sportlance.WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }
        // Нужен для EF Core 2.x https://go.microsoft.com/fwlink/?linkid=851728
        public static IWebHost BuildWebHost(string[] args)
        {
            var builder = WebHost.CreateDefaultBuilder(args);

            if (!AspNetCoreEnvironment.IsProduction())
            {
                builder.UseSetting("detailedErrors", "true");
                builder.CaptureStartupErrors(true);
            }

            return builder.UseStartup<Startup>()
                .Build();
        }
    }
}