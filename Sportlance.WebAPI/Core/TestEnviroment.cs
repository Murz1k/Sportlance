using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Sportlance.WebAPI.Core
{
    public class TestEnviroment
    {
        private readonly AppDbContext _context;
        private readonly Dictionary<Type, object> _instances = new Dictionary<Type, object>();

        public TestEnviroment()
        {
            var builder = new DbContextOptionsBuilder<AppDbContext>();
            builder.UseSqlServer(
                "Data Source=(localdb)\\mssqllocaldb;Initial Catalog=SportlanceDB;Integrated Security=True;MultipleActiveResultSets=True");
            _context = new AppDbContext(builder.Options);

            IServiceCollection services = new ServiceCollection();
            //DataLoader.LoadRepositories(services);

            foreach (var service in services)
                if (!_instances.ContainsKey(service.ServiceType))
                    _instances.Add(service.ServiceType, Activator.CreateInstance(service.ImplementationType, _context));
        }

        public TService GetService<TService>() where TService : class
        {
            return (TService) _instances.FirstOrDefault(i => i.Key == typeof(TService)).Value;
        }

        public AppDbContext GetContext()
        {
            return _context;
        }
    }
}