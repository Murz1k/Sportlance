using System;

namespace Sportlance.Common
{
    public static class AspNetCoreEnvironment
    {
        public static string ShortEnvironment()
        {
            if (IsDevelopment())
            {
                return "dev";
            }
            if (IsProduction())
            {
                return "prod";
            }
            if (IsStaging())
            {
                return "stage";
            }
            if (IsLocal())
            {
                return Environment.MachineName;
            }
            return Environment.MachineName;
        }

        public static bool IsLocal()
        {
            return Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Local";
        }

        public static bool IsDevelopment()
        {
            return Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";
        }

        public static bool IsProduction()
        {
            return Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Production";
        }

        public static bool IsStaging()
        {
            return Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Staging";
        }
    }
}
