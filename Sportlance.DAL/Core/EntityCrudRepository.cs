using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Sportlance.DAL.Core
{
    public class EntityCrudRepository<T> where T : class, IEntityWithId, new()
    {
        protected readonly AppDBContext AppContext;

        public EntityCrudRepository(
            AppDBContext appContext)
        {
            AppContext = appContext;
        }

        public async Task<IEnumerable<T>> GetAllAsync() => await AppContext.Set<T>().ToListAsync();

        public Task<T> GetByIdAsync(long id)
        {
            return AppContext.Set<T>().FirstOrDefaultAsync(i=>i.Id == id);
        }

        private void AddEntity(T entity)
        {
            AppContext.Add(entity);
        }

        private void Attach(T entity)
        {
            AppContext.Attach(entity);
        }

        private void RemoveEntity(T entity)
        {
            //if (AppContext.IsDetached(entity))
            //{
            //    if (AppContext.Entity(entity).IsKeySet)
            //    {
            //        Attach(entity);
            //    }
            //    else
            //    {
            //        AddEntity(entity);
            //    }
            //}
            AppContext.Entity(entity).State = EntityState.Deleted;
        }

        public Task<int> UpdateWholeAsync(T entity)
        {
            Attach(entity);
            AppContext.Entity(entity).State = EntityState.Modified;
            return SaveToDBAsync();
        }

        public Task<int> UpdateAsync(IEnumerable<T> entities, params Expression<Func<T, object>>[] properties)
        {
            if (!properties.Any())
            {
                throw new Exception($"argument {nameof(properties)} is empty");
            }
            foreach (var entity in entities)
            {
                Attach(entity);
                var entityEntry = AppContext.Entity(entity);
                foreach (var property in properties.Where(x => x != null))
                {
                    entityEntry.Property(property).IsModified = true;
                }
            }
            return SaveToDBAsync();
        }

        public Task<int> UpdateAsync(T entity, params Expression<Func<T, object>>[] properties)
        {
            return UpdateAsync(new[] { entity }, properties);
        }

        private Task<int> SaveToDBAsync()
        {
            return AppContext.SaveAsync();
        }

        public Task<int> AddRangeAsync(IEnumerable<T> entities)
        {
            foreach (var entity in entities)
                AddEntity(entity);
            return SaveToDBAsync();
        }

        public Task<int> RemoveRangeAsync(IEnumerable<T> entities)
        {
            foreach (var entity in entities)
                RemoveEntity(entity);
            return SaveToDBAsync();
        }

        public Task<int> AddAsync(T entity)
        {
            AddEntity(entity);
            return SaveToDBAsync();
        }

        public Task<int> RemoveAsync(T entity)
        {
            RemoveEntity(entity);
            return SaveToDBAsync();
        }

        public Task<int> RemoveByIdAsync(long id)
        {
            return RemoveAsync(new T { Id = id });
        }
    }
}
