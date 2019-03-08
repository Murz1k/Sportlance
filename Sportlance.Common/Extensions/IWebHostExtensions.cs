﻿using System;
using System.IO;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace Sportlance.Common.Extensions
{
    public static class IWebHostBuilderExtensions
    {
        // Получение доступа к AWS EB Environments
        public static IWebHostBuilder AddEbConfig(this IWebHostBuilder builder)
        {
            var tempConfigBuilder = new ConfigurationBuilder();

            tempConfigBuilder.AddJsonFile(
                @"C:\Program Files\Amazon\ElasticBeanstalk\config\containerconfiguration",
                optional: true,
                reloadOnChange: true
            );

            var configuration = tempConfigBuilder.Build();

            var ebEnv =
                configuration.GetSection("iis:env")
                    .GetChildren()
                    .Select(pair => pair.Value.Split(new[] { '=' }, 2))
                    .ToDictionary(keypair => keypair.Length > 0 ? keypair[0] : "", keypair => keypair.Length > 1 ? keypair[1] : "");

            foreach (var keyVal in ebEnv)
            {
                Environment.SetEnvironmentVariable(keyVal.Key, keyVal.Value);
            }

            return builder;
        }

        // Получение доступа к файлам appsettings.{environment}.json
        public static IWebHostBuilder AddAppSettings(this IWebHostBuilder builder)
        {
            builder.ConfigureAppConfiguration((hostingContext, config) =>
            {
                var currentDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
                config.SetBasePath(currentDirectory)
                    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                    .AddJsonFile($"appsettings.{hostingContext.HostingEnvironment.EnvironmentName}.json", optional: true)
                    .AddEnvironmentVariables();
            });

            return builder;
        }
    }
}