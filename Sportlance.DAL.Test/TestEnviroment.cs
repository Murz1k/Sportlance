using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Sportlance.DAL.Core;

namespace Sportlance.DAL.Test
{
    public class TestEnviroment
    {
        private readonly Dictionary<Type, object> _instances = new Dictionary<Type, object>();

        public TestEnviroment()
        {
            var builder = new DbContextOptionsBuilder<AppDBContext>();
            builder.UseSqlServer("Data Source=(localdb)\\mssqllocaldb;Initial Catalog=SportlanceDB;Integrated Security=True;MultipleActiveResultSets=True");
            var editableDataContext = AppDBContext.CreateEditable(builder.Options);
            var readOnlyDataContext = AppDBContext.CreateReadOnly(builder.Options);

            IServiceCollection services = new ServiceCollection();
            DataLoader.LoadRepositories(services);

            foreach (var service in services)
            {
                if (!_instances.ContainsKey(service.ServiceType))
                    _instances.Add(service.ServiceType, Activator.CreateInstance(service.ImplementationType, editableDataContext, readOnlyDataContext));
            }
        }

        public TService GetService<TService>() where TService : class
        {
            return (TService)_instances.FirstOrDefault(i => i.Key == typeof(TService)).Value;
        }
    }
}
