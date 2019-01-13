using System;
using System.Threading.Tasks;
using Amazon.S3;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Sportlance.Common.Providers;

namespace Sportlance.MailService
{
    public class Startup
    {
        private readonly IHostingEnvironment _currentEnvironment;

        public Startup(IConfiguration configuration, IHostingEnvironment currentEnvironment)
        {
            Configuration = configuration;
            _currentEnvironment = currentEnvironment;

            var builder = new ConfigurationBuilder()
                .SetBasePath(currentEnvironment.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{currentEnvironment.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<SmtpOptions>(Configuration.GetSection(nameof(SmtpOptions)));
            services.Configure<SiteOptions>(Configuration.GetSection(nameof(SiteOptions)));

            services.AddDefaultAWSOptions(Configuration.GetAWSOptions());
            services.AddAWSService<IAmazonS3>();

            services.AddTransient<IService, Service>();
            services.AddTransient<TokenService, TokenService>();

            services.AddSingleton(InitializeMailQueueProvider);

            RunQueue(services);
        }

        public void RunQueue(IServiceCollection services)
        {
            services.AddDataProtection();
            var sp = services.BuildServiceProvider();

            var service = sp.GetService<MailQueueProvider>();
            Task.Run(() => service.CheckMessagesAsync());
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
        }


        private MailQueueProvider InitializeMailQueueProvider(IServiceProvider serviceProvider)
        {
            var storageProvider = new MailQueueProvider(serviceProvider.GetService<IService>());
            storageProvider.InitializeAsync().Wait();
            return storageProvider;
        }
    }
}