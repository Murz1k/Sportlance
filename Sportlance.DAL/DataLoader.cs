using Microsoft.Extensions.DependencyInjection;
using Sportlance.DAL.Interfaces;
using Sportlance.DAL.Repositories;

namespace Sportlance.DAL
{
    public class DataLoader
    {
        public static void LoadRepositories(IServiceCollection services)
        {
            services.AddTransient<ISportRepository, SportRepository>();
            services.AddTransient<ITrainerRepository, TrainerRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IReviewRepository, ReviewRepository>();
            services.AddTransient<ITrainingRepository, TrainingRepository>();
            services.AddTransient<IRoleRepository, RoleRepository>();
        }
    }
}
