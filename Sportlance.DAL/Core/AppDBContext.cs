using System.Linq;
using System.Net.Mime;
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

        IQueryable<User> IReadOnlyDataContext.Users => Users.AsNoTracking();

        IQueryable<Sport> IReadOnlyDataContext.Sports => Sports.AsNoTracking();

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
            //modelBuilder.Entity<Project>()
            //            .HasIndex(p => new { p.ExternalId })
            //            .IsUnique();

            //modelBuilder.Entity<Scoring>()
            //            .HasIndex(p => new { p.ProjectId })
            //            .IsUnique();

            //modelBuilder.Entity<Scoring>()
            //            .HasMany(s => s.AreaScorings)
            //            .WithOne(a => a.Scoring);

            //modelBuilder.Entity<VotingProject>()
            //            .HasKey(v => new { v.ProjectId, v.VotingId });

            //modelBuilder.Entity<VotingProject>()
            //            .HasIndex(v => new { v.ProjectId, v.VotingId });

            //modelBuilder.Entity<User>()
            //            .HasIndex(u => u.Email)
            //            .IsUnique();

            //modelBuilder.Entity<User>()
            //            .HasIndex(u => u.Address)
            //            .IsUnique();

            //modelBuilder.Entity<Role>()
            //            .HasIndex(r => r.Name)
            //            .IsUnique();

            //modelBuilder.Entity<UserRole>()
            //            .HasKey(u => new { u.UserId, u.RoleId });

            //modelBuilder.Entity<Area>()
            //            .HasKey(r => r.Id);

            //modelBuilder.Entity<Area>()
            //            .Property(r => r.Id)
            //            .ValueGeneratedNever();

            //modelBuilder.Entity<Area>()
            //            .HasIndex(r => r.Name)
            //            .IsUnique();

            //modelBuilder.Entity<ExpertApplicationArea>()
            //            .HasKey(e => new { e.ExpertApplicationId, AreaType = e.AreaId });

            //modelBuilder.Entity<Expert>()
            //            .HasKey(r => r.UserId);

            //modelBuilder.Entity<ExpertArea>()
            //            .HasKey(u => new { u.ExpertId, u.AreaId });

            //modelBuilder.Entity<Expert>()
            //            .HasMany(c => c.ExpertAreas)
            //            .WithOne(e => e.Expert)
            //            .OnDelete(DeleteBehavior.Cascade);

            //modelBuilder.Entity<User>()
            //            .HasOne(r => r.Expert)
            //            .WithOne(r => r.User)
            //            .HasForeignKey<Expert>(u => u.UserId);

            //modelBuilder.Entity<AreaScoring>()
            //            .HasKey(e => new { e.ScoringId, e.AreaId });

            //modelBuilder.Entity<AreaScoring>()
            //            .HasIndex(e => new { e.ScoringId, e.AreaId });

            //modelBuilder.Entity<ScoringOffer>()
            //            .HasKey(e => new { e.ScoringId, e.AreaId, e.ExpertId });

            //modelBuilder.Entity<ScoringOffer>()
            //            .HasIndex(e => new { e.ScoringId, e.AreaId, e.ExpertId });
        }
    }
}
