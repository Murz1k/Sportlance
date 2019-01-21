using System;
using Microsoft.AspNetCore.Hosting;

namespace Sportlance.Common.Extensions
{
    public static class IHostingEnvironmentExtension
    {
        public static string ShortEnvironment(this IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                return "dev";
            }

            if (env.IsProduction())
            {
                return "prod";
            }

            if (env.IsStaging())
            {
                return "stage";
            }

            if (env.IsLocal())
            {
                return Environment.MachineName;
            }

            return Environment.MachineName;
        }

        public static bool IsLocal(this IHostingEnvironment env)
        {
            return env.EnvironmentName == "Local";
        }
    }
}