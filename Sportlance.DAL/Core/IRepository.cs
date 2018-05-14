using System.Collections.Generic;
using System.Linq;

namespace Sportlance.DAL.Core
{
    public interface IRepository<T> where T: class, new ()
    {
        T Add(T entity);

        IEnumerable<T> AddRange(IEnumerable<T> entities);

        void Remove(T entity);

        IQueryable<T> Entities();
    }
}
