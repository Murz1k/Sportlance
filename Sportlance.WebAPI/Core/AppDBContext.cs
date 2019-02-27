using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Sportlance.WebAPI.Entities;
using System.IO;

namespace Sportlance.WebAPI.Core
{
    public sealed class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<Training> Trainings { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<UserRole> UserRoles { get; set; }

        public DbSet<Feedback> Feedbacks { get; set; }

        public DbSet<TrainerFeedback> TrainerFeedback { get; set; }

        public DbSet<Team> Teams { get; set; }

        public DbSet<Trainer> Trainers { get; set; }

        public DbSet<TrainerWorkExperience> TrainerWorkExperience { get; set; }

        public DbSet<TrainerSport> TrainerSports { get; set; }

        public DbSet<TrainerTeam> TrainerTeams { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<Sport> Sports { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Phone);

            modelBuilder.Entity<Trainer>()
                .HasKey(r => r.UserId);

            modelBuilder.Entity<Order>()
                .HasOne(r => r.Customer);

            modelBuilder.Entity<Order>()
                .HasOne(r => r.Executor);

            modelBuilder.Entity<Trainer>()
                .HasMany(i => i.TrainerTeams);

            modelBuilder.Entity<Team>()
                .HasMany(i => i.TrainerTeams);

            modelBuilder.Entity<Trainer>()
                .HasMany(r => r.TrainerSports);

            modelBuilder.Entity<Trainer>()
                .HasMany(r => r.WorkExperience)
                .WithOne(i => i.Trainer)
                .HasForeignKey(i => i.TrainerId);

            modelBuilder.Entity<TrainerWorkExperience>()
                .HasMany(c => c.Skills);

            modelBuilder.Entity<Sport>()
                .HasMany(c => c.Skills);

            modelBuilder.Entity<TrainerWorkExperience>()
                .Property(i => i.Position)
                .IsRequired();

            modelBuilder.Entity<TrainerWorkExperience>()
                .Property(i => i.Company)
                .IsRequired();

            modelBuilder.Entity<TrainerSport>()
                .HasMany(r => r.Trainings);

            modelBuilder.Entity<Training>()
                .HasOne(r => r.Client);

            modelBuilder.Entity<Training>()
                .HasOne(r => r.Feedback);

            modelBuilder.Entity<Trainer>()
                .HasOne(u => u.User)
                .WithOne()
                .HasForeignKey<Trainer>(c => c.UserId);

            modelBuilder.Entity<Feedback>()
                .HasOne(r => r.User);

            modelBuilder.Entity<TrainerFeedback>()
                .HasKey(r => r.TrainingId);

            modelBuilder.Entity<TeamService>()
                .HasOne(c => c.Team);

            modelBuilder.Entity<TrainerSport>()
                .HasOne(c => c.Sport);

            modelBuilder.Entity<User>()
                .HasMany(c => c.UserRoles);

            modelBuilder.Entity<Role>()
                .HasMany(c => c.UserRoles);

            modelBuilder.Entity<TeamPhoto>()
                .HasOne(c => c.Team);
        }
    }

    public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile($"appsettings.Local.json", optional: true)
                .Build();
            var builder = new DbContextOptionsBuilder<AppDbContext>();
            var connectionString = configuration.GetConnectionString("SQLDatabase");
            builder.UseSqlServer(connectionString);
            return new AppDbContext(builder.Options);
        }
    }
}