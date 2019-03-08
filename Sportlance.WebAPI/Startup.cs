using System;
using System.Text;
using Amazon.Runtime;
using Amazon.S3;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Sportlance.Common.Extensions;
using Sportlance.WebAPI.Authentication;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Core.ExceptionHandler;
using Sportlance.WebAPI.Core.Filters;
using Sportlance.WebAPI.Core.Options;
using Sportlance.WebAPI.Core.Utilities;
using Sportlance.WebAPI.Feedbacks;
using Sportlance.WebAPI.Teams;
using Sportlance.WebAPI.Trainers;
using Sportlance.WebAPI.Sports;
using Sportlance.WebAPI.Users;
using Sportlance.Common.Providers;
using Sportlance.Common;
using Sportlance.WebAPI.Orders;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Sportlance.WebAPI
{
    public class Startup
    {
        private const string CorsPolicyName = "SportlancePolicy";
        private readonly IHostingEnvironment _currentEnvironment;
        private readonly IConfiguration _configuration;
        private readonly ILogger<Startup> _logger;

        public Startup(ILogger<Startup> logger, IConfiguration configuration, IHostingEnvironment currentEnvironment)
        {
            _configuration = configuration;
            _currentEnvironment = currentEnvironment;
            _logger = logger;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.ConfigureOptions(_configuration,
                typeof(AuthenticationOptions),
                typeof(SiteOptions),
                typeof(JwtIssuerOptions)
                );

            services.Configure<SiteOptions>(_configuration.GetSection(nameof(SiteOptions)));

            services.AddAuthorization(options =>
            {
                options.DefaultPolicy = new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser().Build();
            });

            services.AddMvc(options =>
            {
                options.Filters.Add(new AuthenticationFilterFactory());
                options.Filters.Add(new AppErrorsExceptionFilter());
                options.Filters.Add(new ModelStateFilter());
            })
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
        .AddXmlSerializerFormatters()
        .AddXmlDataContractSerializerFormatters();

            ConfigureJwt(services);

            ConfigureCorsPolicy(services);

            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(_configuration.GetConnectionString("SQLDatabase")));

            services.AddTransient<IDateTime, UtcDateTime>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            ConfigureAmazonServices(services);

            ConfigureBusinessServices(services);
        }

        private void ConfigureBusinessServices(IServiceCollection services)
        {
            try
            {
                services.AddTransient<IUserService, UserService>();
                services.AddTransient<ISportService, SportService>();
                services.AddTransient<ITrainersService, TrainersService>();
                services.AddTransient<IFeedbackService, FeedbackService>();
                services.AddTransient<ITeamService, TeamsService>();
                services.AddTransient<IOrdersService, OrdersService>();
                services.AddTransient<IAuthService, AuthService>();
                services.AddTransient<MailTokenService, MailTokenService>();
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Произошла ошибка при конфигурации сервисов Sportlance");
            }
        }

        private void ConfigureAmazonServices(IServiceCollection services)
        {
            try
            {
                var awsOptions = _configuration.GetAWSOptions();

                // Это нужно для амазона, потому что там нельзя прописать дефолтный профиль
                // В амазоне нужно в environments добавить эти ключи и значения
                if (!AspNetCoreEnvironment.IsLocal())
                {
                    awsOptions.Credentials =
                        new BasicAWSCredentials(_configuration["AWS:AccessKey"], _configuration["AWS:SecretKey"]);
                }

                services.AddDefaultAWSOptions(awsOptions);
                services.AddAWSService<IAmazonS3>();

                services.AddSingleton(InitializeTrainersStorageProvider);
                services.AddSingleton(InitializeTeamsStorageProvider);
                services.AddSingleton(InitializeTeamPhotosStorageProvider);
                services.AddSingleton(InitializeUsersStorageProvider);

                services.AddSingleton(InitializeAmazonQueueProvider);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Произошла ошибка при конфигурации сервисов Amazon");
            }
        }

        private void ConfigureCorsPolicy(IServiceCollection services)
        {
            var sp = services.BuildServiceProvider();
            var siteOptions = sp.GetService<SiteOptions>();
            var corsPolicyBuilder = new CorsPolicyBuilder();

            if (_currentEnvironment.IsProduction())
            {
                corsPolicyBuilder.WithOrigins(siteOptions.Root);
                corsPolicyBuilder.WithExposedHeaders(Headers.XNewAuthToken);
            }
            else
            {
                corsPolicyBuilder.AllowAnyOrigin();
            }

            corsPolicyBuilder.AllowAnyHeader();
            //corsPolicyBuilder.WithMethods("GET","POST","PUT","DELETE");
            corsPolicyBuilder.AllowAnyMethod();
            //    Constants.Headers.XNewRoles,
            corsPolicyBuilder.AllowCredentials();

            services.AddCors(options => { options.AddPolicy(CorsPolicyName, corsPolicyBuilder.Build()); });
        }

        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            if (_currentEnvironment.IsLocal())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                loggerFactory.AddAWSProvider(_configuration.GetAWSLoggingConfigSection());
            }

            app.UseCors(CorsPolicyName);

            app.UseMvc();
        }

        private TeamPhotosStorageProvider InitializeTeamPhotosStorageProvider(IServiceProvider serviceProvider)
        {
            var storageProvider =
                new TeamPhotosStorageProvider(serviceProvider.GetService<IAmazonS3>(), _currentEnvironment);
            storageProvider.InitializeAsync().Wait();
            return storageProvider;
        }

        private TrainersStorageProvider InitializeTrainersStorageProvider(IServiceProvider serviceProvider)
        {
            var storageProvider =
                new TrainersStorageProvider(serviceProvider.GetService<IAmazonS3>(), _currentEnvironment);
            storageProvider.InitializeAsync().Wait();
            return storageProvider;
        }

        private TeamsStorageProvider InitializeTeamsStorageProvider(IServiceProvider serviceProvider)
        {
            var storageProvider =
                new TeamsStorageProvider(serviceProvider.GetService<IAmazonS3>(), _currentEnvironment);
            storageProvider.InitializeAsync().Wait();
            return storageProvider;
        }

        private UsersStorageProvider InitializeUsersStorageProvider(IServiceProvider serviceProvider)
        {
            var storageProvider =
                new UsersStorageProvider(serviceProvider.GetService<IAmazonS3>(), _currentEnvironment);
            storageProvider.InitializeAsync().Wait();

            return storageProvider;
        }

        private AmazonQueueProvider InitializeAmazonQueueProvider(IServiceProvider serviceProvider)
        {
            var storageProvider =
                new AmazonQueueProvider($"sportlance-{AspNetCoreEnvironment.ShortEnvironment(_configuration["SLEnvironment"])}-mail-queue");
            storageProvider.InitializeAsync().Wait();

            return storageProvider;
        }

        private void ConfigureJwt(IServiceCollection services)
        {
            var sp = services.BuildServiceProvider();
            var jwtAppSettingOptions = sp.GetService<JwtIssuerOptions>();

            var signingKey =
                new SymmetricSecurityKey(
                    Encoding.ASCII.GetBytes(jwtAppSettingOptions.SecretKey));

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = jwtAppSettingOptions.Issuer,

                ValidateAudience = true,
                ValidAudience = jwtAppSettingOptions.Audience,

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey,

                RequireExpirationTime = true,
                ValidateLifetime = true,

                ClockSkew = TimeSpan.Zero
            };

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => { options.TokenValidationParameters = tokenValidationParameters; });

            services.Configure<JwtIssuerOptions>(options =>
            {
                options.AccessTokenExpiration = jwtAppSettingOptions.AccessTokenExpiration;
                options.AccessTokenRefreshInterval = jwtAppSettingOptions.AccessTokenRefreshInterval;
                options.Issuer = jwtAppSettingOptions.Issuer;
                options.Audience = jwtAppSettingOptions.Audience;
                options.SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            });
        }
    }
}