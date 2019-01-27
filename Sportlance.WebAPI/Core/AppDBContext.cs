using Microsoft.EntityFrameworkCore;
using Sportlance.WebAPI.Entities;

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

        public DbSet<Trainer> Trainers { get; set; }

        public DbSet<Team> Teams { get; set; }

        public DbSet<TrainerSport> TrainerSports { get; set; }

        public DbSet<TrainerTeam> TrainerTeams { get; set; }

        public DbSet<User> Users { get; set; }

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
            
            modelBuilder.Entity<Trainer>()
                .HasMany(i => i.TrainerTeams);
            
            modelBuilder.Entity<Team>()
                .HasMany(i => i.TrainerTeams);

            modelBuilder.Entity<Trainer>()
                .HasMany(r => r.TrainerSports);

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
}