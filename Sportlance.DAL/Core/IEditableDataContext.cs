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
        DbSet<Trainer> Trainers { get; }
        DbSet<Sport> Sports { get; }
        DbSet<TrainerSports> TrainerSports { get; }
        DbSet<Feedback> Feedbacks { get; }
        DbSet<Training> Trainings { get; }

        Task<int> SaveAsync();
        EntityEntry<T> Entity<T>(T x) where T : class;
        DbSet<T> DbSet<T>() where T : class;
    }
}
