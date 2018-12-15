using System;
using System.Text;
using Amazon;
using Amazon.Extensions.NETCore.Setup;
using Amazon.Runtime;
using Amazon.Runtime.CredentialManagement;
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

namespace Sportlance.WebAPI
{
    public class Startup
    {
        private const string CorsPolicyName = "SportlancePolicy";
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
            });
            services.AddDefaultAWSOptions(Configuration.GetAWSOptions());

            JwtConfigure(services);

            services.ConfigureOptions(Configuration, typeof(AuthenticationOptions), typeof(SiteOptions));
            services.Configure<SmtpOptions>(Configuration.GetSection(nameof(SmtpOptions)));
            services.Configure<SiteOptions>(Configuration.GetSection(nameof(SiteOptions)));

            var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));

            var signingKey =
                new SymmetricSecurityKey(
                    Encoding.ASCII.GetBytes(jwtAppSettingOptions[nameof(JwtIssuerOptions.SecretKey)]));
            services.Configure<JwtIssuerOptions>(options =>
            {
                options.AccessTokenExpiration =
                    TimeSpan.Parse(jwtAppSettingOptions[nameof(JwtIssuerOptions.AccessTokenExpiration)]);
                options.AccessTokenRefreshInterval =
                    TimeSpan.Parse(jwtAppSettingOptions[nameof(JwtIssuerOptions.AccessTokenRefreshInterval)]);
                options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
                options.SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            });

            ConfigureCorsPolicy(services);

            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("SQLDatabase")));

            services.AddDefaultAWSOptions(Configuration.GetAWSOptions());
            services.AddAWSService<IAmazonS3>();

            services.AddTransient<IDateTime, UtcDateTime>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton(InitializeTrainersStorageProvider);
            services.AddSingleton(InitializeTeamsStorageProvider);
            services.AddSingleton(InitializeTeamPhotosStorageProvider);
            services.AddSingleton(InitializeUsersStorageProvider);

            services.AddTransient<IUserService, UserService>();
            services.AddTransient<ISportService, SportService>();
            services.AddTransient<ITrainerService, TrainersService>();
            services.AddTransient<IFeedbackService, FeedbackService>();
            services.AddTransient<ITeamService, TeamsService>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IMailService, MailService>();
            services.AddTransient<MailTokenService, MailTokenService>();
        }

        private void ConfigureCorsPolicy(IServiceCollection services)
        {
            var sp = services.BuildServiceProvider();
            var siteOptions = sp.GetService<SiteOptions>();
            var url = siteOptions.Root;
            //if (!_currentEnvironment.IsProduction())
            url = "*";

            var corsPolicyBuilder = new CorsPolicyBuilder();
            //corsPolicyBuilder.WithOrigins(url);
            corsPolicyBuilder.AllowAnyOrigin();
            corsPolicyBuilder.AllowAnyHeader();
            corsPolicyBuilder.AllowAnyMethod();
            corsPolicyBuilder.WithExposedHeaders(Headers.XNewAuthToken);
            //    Constants.Headers.XNewRoles,
            corsPolicyBuilder.AllowCredentials();

            services.AddCors(options => { options.AddPolicy(CorsPolicyName, corsPolicyBuilder.Build()); });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //if (env.IsDevelopment())
            app.UseDeveloperExceptionPage();

            app.UseCors(CorsPolicyName);

            app.UseMvc();
        }

        private TeamPhotosStorageProvider InitializeTeamPhotosStorageProvider(IServiceProvider serviceProvider)
        {
            var storageProvider = new TeamPhotosStorageProvider(serviceProvider.GetService<IAmazonS3>());
            storageProvider.InitializeAsync().Wait();
            return storageProvider;
        }

        private TrainersStorageProvider InitializeTrainersStorageProvider(IServiceProvider serviceProvider)
        {
            var storageProvider = new TrainersStorageProvider(serviceProvider.GetService<IAmazonS3>());
            storageProvider.InitializeAsync().Wait();
            return storageProvider;
        }

        private TeamsStorageProvider InitializeTeamsStorageProvider(IServiceProvider serviceProvider)
        {
            var storageProvider = new TeamsStorageProvider(serviceProvider.GetService<IAmazonS3>());
            storageProvider.InitializeAsync().Wait();
            return storageProvider;
        }

        private UsersStorageProvider InitializeUsersStorageProvider(IServiceProvider serviceProvider)
        {
            var storageProvider = new UsersStorageProvider(serviceProvider.GetService<IAmazonS3>());
            storageProvider.InitializeAsync().Wait();
            return storageProvider;
        }

        private void JwtConfigure(IServiceCollection services)
        {
            var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));

            var signingKey =
                new SymmetricSecurityKey(
                    Encoding.ASCII.GetBytes(jwtAppSettingOptions[nameof(JwtIssuerOptions.SecretKey)]));

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],

                ValidateAudience = true,
                ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey,

                RequireExpirationTime = true,
                ValidateLifetime = true,

                ClockSkew = TimeSpan.Zero
            };

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => { options.TokenValidationParameters = tokenValidationParameters; });
        }
    }
}