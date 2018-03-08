using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Sportlance.DAL.Entities;

namespace Sportlance.DAL.Core
{
    public interface IEditableDataContext : IDisposable
    {
        DbSet<User> Users { get; }

        Task<int> SaveAsync();
        EntityEntry<T> Entity<T>(T x) where T : class;
        DbSet<T> DbSet<T>() where T : class;
    }
}
