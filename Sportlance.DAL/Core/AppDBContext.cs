using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Sportlance.DAL.Entities;

namespace Sportlance.DAL.Core
{
    public sealed class AppDBContext : DbContext, IReadOnlyDataContext, IEditableDataContext
    {
        public AppDBContext(DbContextOptions options)
            : base(options)
        {
        }

        IQueryable<Trainer> IReadOnlyDataContext.Trainers => Trainers.AsNoTracking();

        IQueryable<TrainerSports> IReadOnlyDataContext.TrainerSports => TrainerSports.AsNoTracking();

        IQueryable<Review> IReadOnlyDataContext.Reviews => Reviews.AsNoTracking();

        IQueryable<Training> IReadOnlyDataContext.Trainings => Trainings.AsNoTracking();

        IQueryable<User> IReadOnlyDataContext.Users => Users.AsNoTracking();

        IQueryable<Sport> IReadOnlyDataContext.Sports => Sports.AsNoTracking();

        IQueryable<UserRole> IReadOnlyDataContext.UserRoles => UserRoles.AsNoTracking();

        IQueryable<Role> IReadOnlyDataContext.Roles => Roles.AsNoTracking();

        IQueryable<Client> IReadOnlyDataContext.Clients => Clients.AsNoTracking();

        public DbSet<Training> Trainings { get; set; }

        public DbSet<Client> Clients { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<UserRole> UserRoles { get; set; }

        public DbSet<Review> Reviews { get; set; }

        public DbSet<Trainer> Trainers { get; set; }

        public DbSet<TrainerSports> TrainerSports { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Sport> Sports { get; set; }

        public IQueryable<T> GetAll<T>() where T : class
        {
            return Set<T>().AsNoTracking();
        }

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

        public static IEditableDataContext CreateEditable(DbContextOptions<AppDBContext> options)
        {
            return new AppDBContext(options);
        }

        public static IReadOnlyDataContext CreateReadOnly(DbContextOptions<AppDBContext> options)
        {
            var context = new AppDBContext(options);
            context.ChangeTracker.AutoDetectChangesEnabled = false;
            context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;

            context.Database.AutoTransactionsEnabled = false;
            return context;
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
                .HasOne(r => r.User);

            modelBuilder.Entity<Trainer>()
                .HasKey(r => r.UserId);

            modelBuilder.Entity<Training>()
                .HasOne(r => r.TrainerSport);

            modelBuilder.Entity<Training>()
                .HasOne(r => r.Client);

            modelBuilder.Entity<Trainer>()
                .HasOne(u => u.User);

            modelBuilder.Entity<Review>()
                .HasOne(c => c.Training);

            modelBuilder.Entity<TrainerSports>()
                .HasOne(c => c.Trainer);

            modelBuilder.Entity<TrainerSports>()
                .HasOne(c => c.Sport);

            modelBuilder.Entity<UserRole>()
                .HasOne(c => c.User);

            modelBuilder.Entity<UserRole>()
                .HasOne(c => c.Role);

            //modelBuilder.Entity<Expert>()
            //            .HasMany(c => c.ExpertAreas)
            //            .WithOne(e => e.Expert)
            //            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}