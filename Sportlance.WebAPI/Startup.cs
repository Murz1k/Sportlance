using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Sportlance.WebAPI.Interfaces;
using Sportlance.WebAPI.Services;
using Sportlance.DAL.Core;
using Sportlance.DAL.Interfaces;
using Sportlance.DAL.Repositories;
using Sportlance.WebAPI.Authentication;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Options;

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
        }

        public IConfiguration Configuration { get; }
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            
            services.ConfigureOptions(Configuration, typeof(AuthenticationOptions), typeof(SiteOptions));
            services.Configure<SmtpOptions>(Configuration.GetSection(nameof(SmtpOptions)));
            services.Configure<SiteOptions>(Configuration.GetSection(nameof(SiteOptions)));

            ConfigureCorsPolicy(services);

            var builder = new DbContextOptionsBuilder<AppDBContext>();
            builder.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            var dbOptions = builder.Options;
            services.AddDbContext<AppDBContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddTransient(x => AppDBContext.CreateEditable(dbOptions));
            services.AddTransient(x => AppDBContext.CreateReadOnly(dbOptions));

            services.AddTransient<ISportRepository, SportRepository>();
            services.AddTransient<ITrainerRepository, TrainerRepository>();
            services.AddTransient<IUserRepository, UserRepository>();

            services.AddTransient<ISportService, SportService>();
            services.AddTransient<ITrainerService, TrainerService>();
            services.AddTransient<AuthService, AuthService>();
            services.AddTransient<MailService, MailService>();
            services.AddTransient<MailTokenService, MailTokenService>();
        }
        
        private void ConfigureCorsPolicy(IServiceCollection services)
        {
            var sp = services.BuildServiceProvider();
            var siteOptions = sp.GetService<SiteOptions>();
            var url = siteOptions.Root;
            if (!_currentEnvironment.IsProduction())
            {
                url = "*";
            }

            var corsPolicyBuilder = new CorsPolicyBuilder();
            corsPolicyBuilder.WithOrigins(url);
            corsPolicyBuilder.AllowAnyHeader();
            corsPolicyBuilder.AllowAnyMethod();
            //corsPolicyBuilder.WithExposedHeaders(Constants.Headers.XNewAuthToken,
            //    Constants.Headers.XNewRoles,
            //    Constants.Headers.XEthereumAddress,
            //    Constants.Headers.XSignature,
            //    Constants.Headers.XSignedText);
            corsPolicyBuilder.AllowCredentials();

            services.AddCors(options => { options.AddPolicy(CorsPolicyName, corsPolicyBuilder.Build()); });
        }
        
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(CorsPolicyName);

            app.UseMvc();
        }
    }
}
