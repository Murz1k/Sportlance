using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Sportlance.Common.Options;
using Sportlance.Common.Providers;

namespace Sportlance.Common.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void ConfigureOptions(this IServiceCollection services, IConfiguration configuration,
            params Type[] optionsTypes)
        {
            if (services == null)
                throw new ArgumentNullException(nameof(services));
            if (configuration == null)
                throw new ArgumentNullException(nameof(configuration));

            foreach (var type in optionsTypes)
            {
                var config = Activator.CreateInstance(type);
                configuration.Bind(type.ShortDisplayName(), config);
                services.AddSingleton(type, config);
            }
        }

        public static async Task<IServiceCollection> AddProviderAsync(this IServiceCollection services, IProvier provider)
        {
            if (services == null)
                throw new ArgumentNullException(nameof(services));
            if (provider ==  null)
                throw new ArgumentNullException(nameof(provider));
            await provider.InitializeAsync();
            return services.AddSingleton(provider);
        }
    }
}