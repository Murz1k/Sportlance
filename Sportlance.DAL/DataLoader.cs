using Microsoft.Extensions.DependencyInjection;
using Sportlance.DAL.Interfaces;
using Sportlance.DAL.Repositories;

namespace Sportlance.DAL
{
    public class DataLoader
    {
        public static void LoadRepositories(IServiceCollection services)
        {
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IRoleRepository, RoleRepository>();
        }
    }
}