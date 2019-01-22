﻿using System;
using System.Threading.Tasks;
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

        public Startup(IConfiguration configuration, IHostingEnvironment currentEnvironment)
        {
            Configuration = configuration;
            _currentEnvironment = currentEnvironment;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.Configure<SmtpOptions>(Configuration.GetSection(nameof(SmtpOptions)));
            services.Configure<SiteOptions>(Configuration.GetSection(nameof(SiteOptions)));

            var awsOptions = Configuration.GetAWSOptions();

            // Это нужно для амазона, потому что там нельзя прописать дефолтный профиль
            // В амазоне нужно в environments добавить эти ключи и значения
            if (!AspNetCoreEnvironment.IsLocal())
            {
                awsOptions.Credentials =
                    new BasicAWSCredentials(Configuration["AWS:AccessKey"], Configuration["AWS:SecretKey"]);
            }

            services.AddDefaultAWSOptions(awsOptions);
            
            // 1. Нужно для IService (читать темплейты почты)
            services.AddAWSService<IAmazonS3>();            
            // 2. Нужно для TokenService (Декодировать токены)
            services.AddDataProtection();
            // 3. Нужно для IService (Декодировать токены)
            services.AddTransient<TokenService, TokenService>();
            // 4. Нужно для MailQueue (Отравлять письма)
            services.AddTransient<IService, Service>();
            
            services.AddHostedService<MailHostedService>();

            ConfigureCorsPolicy(services);
        }

        private void ConfigureCorsPolicy(IServiceCollection services)
        {
            var sp = services.BuildServiceProvider();
            var siteOptions = sp.GetService<SiteOptions>();
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