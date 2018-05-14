using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Sportlance.DAL.Entities;

namespace Sportlance.DAL.Core
{
    public sealed class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<Training> Trainings { get; set; }

        public DbSet<Client> Clients { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<UserRole> UserRoles { get; set; }

        public DbSet<Feedback> Feedbacks { get; set; }

        public DbSet<Trainer> Trainers { get; set; }

        public DbSet<TrainerSport> TrainerSports { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Sport> Sports { get; set; }

        public Task<int> SaveAsync()
        {
            return SaveChangesAsync();
        }

        public DbSet<T> DbSet<T>() where T : class
        {
            return Set<T>();
        }

        public EntityEntry<T> Entity<T>(T x) where T : class
        {
            return Entry(x);
        }

        public bool IsDetached<T>(T entity) where T : class, new ()
        {
            return Entry(entity).State == EntityState.Detached;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Phone)
                .IsUnique();

            modelBuilder.Entity<Client>()
                .HasKey(r => r.UserId);

            modelBuilder.Entity<Client>()
                .HasOne(r => r.User)
                .WithOne()
                .HasForeignKey<Client>(c => c.UserId);

            modelBuilder.Entity<Trainer>()
                .HasKey(r => r.UserId);

            modelBuilder.Entity<Training>()
                .HasOne(r => r.TrainerSport);

            modelBuilder.Entity<Training>()
                .HasOne(r => r.Client);

            modelBuilder.Entity<Trainer>()
                .HasOne(u => u.User)
                .WithOne()
                .HasForeignKey<Trainer>(c => c.UserId);

            modelBuilder.Entity<Feedback>()
                .HasKey(r => r.TrainingId);

            modelBuilder.Entity<Feedback>()
                .HasOne(c => c.Training)
                .WithOne()
                .HasForeignKey<Feedback>(p => p.TrainingId);

            modelBuilder.Entity<TrainerSport>()
                .HasOne(c => c.Trainer);

            modelBuilder.Entity<TrainerSport>()
                .HasOne(c => c.Sport);

            modelBuilder.Entity<UserRole>()
                .HasOne(c => c.User);

            modelBuilder.Entity<UserRole>()
                .HasOne(c => c.Role);
        }
    }
}