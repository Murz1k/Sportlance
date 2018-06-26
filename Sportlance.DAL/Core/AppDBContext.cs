using Microsoft.EntityFrameworkCore;
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

        public DbSet<Team> Teams { get; set; }

        public DbSet<TrainerSport> TrainerSports { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Sport> Sports { get; set; }

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

            modelBuilder.Entity<Team>()
                .HasMany(i => i.TrainerTeams);

            modelBuilder.Entity<Trainer>()
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

            modelBuilder.Entity<TrainerSport>()
                .HasOne(c => c.Sport);

            modelBuilder.Entity<User>()
                .HasMany(c => c.UserRoles);

            modelBuilder.Entity<UserRole>()
                .HasOne(c => c.Role);
        }
    }
}