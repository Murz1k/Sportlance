using Amazon.Runtime;
using Amazon.S3;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Sportlance.Common;

namespace Sportlance.MailService
{
    public class Startup
    {
        private const string CorsPolicyName = "SportlancePolicy";
        private readonly IHostingEnvironment _currentEnvironment;
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration, IHostingEnvironment currentEnvironment)
        {
            _configuration = configuration;
            _currentEnvironment = currentEnvironment;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.Configure<SmtpOptions>(_configuration.GetSection(nameof(SmtpOptions)));
            services.Configure<SiteOptions>(_configuration.GetSection(nameof(SiteOptions)));

            var awsOptions = _configuration.GetAWSOptions();

            // Это нужно для амазона, потому что там нельзя прописать дефолтный профиль
            // В амазоне нужно в environments добавить эти ключи и значения
            if (!AspNetCoreEnvironment.IsLocal())
            {
                awsOptions.Credentials =
                    new BasicAWSCredentials(_configuration["AWS:AccessKey"], _configuration["AWS:SecretKey"]);
            }

            services.AddDefaultAWSOptions(awsOptions);

            // 1. Нужно для IService (читать темплейты почты)
            services.AddAWSService<IAmazonS3>();            
            // 2. Нужно для MailQueue (Отравлять письма)
            services.AddTransient<IService, Service>();
            
            services.AddHostedService<MailHostedService>();

            ConfigureCorsPolicy(services);
        }

        private void ConfigureCorsPolicy(IServiceCollection services)
        {
            var corsPolicyBuilder = new CorsPolicyBuilder();

            corsPolicyBuilder.AllowAnyOrigin();

            corsPolicyBuilder.AllowAnyHeader();
            //corsPolicyBuilder.WithMethods("GET","POST","PUT","DELETE");
            corsPolicyBuilder.AllowAnyMethod();
            //    Constants.Headers.XNewRoles,
            corsPolicyBuilder.AllowCredentials();

            services.AddCors(options => { options.AddPolicy(CorsPolicyName, corsPolicyBuilder.Build()); });
        }

        public void Configure(IApplicationBuilder app)
        {
            if (!AspNetCoreEnvironment.IsProduction())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(CorsPolicyName);

            app.UseMvc();
        }
    }
}