﻿// <auto-generated />

using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Sportlance.WebAPI.Core;

namespace Sportlance.WebAPI.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20180707115754_AddTeamGalleryPhotos")]
    partial class AddTeamGalleryPhotos
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.3-rtm-10026")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Sportlance.DAL.Entities.Client", b =>
                {
                    b.Property<long>("UserId");

                    b.Property<int>("Status");

                    b.HasKey("UserId");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.Feedback", b =>
                {
                    b.Property<long>("TrainingId");

                    b.Property<DateTime>("CreateDate");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(500);

                    b.Property<byte?>("Score");

                    b.HasKey("TrainingId");

                    b.ToTable("Feedbacks");
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.Role", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<long?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.Sport", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Sports");
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.Team", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("About");

                    b.Property<long>("AuthorId");

                    b.Property<string>("City");

                    b.Property<string>("Country");

                    b.Property<DateTime>("CreateDateTime");

                    b.Property<string>("PhoneNumber");

                    b.Property<string>("PhotoUrl");

                    b.Property<int>("Status");

                    b.Property<string>("SubTitle");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.TeamPhoto", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("PhotoUrl");

                    b.Property<long>("TeamId");

                    b.HasKey("Id");

                    b.HasIndex("TeamId");

                    b.ToTable("TeamPhoto");
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.Trainer", b =>
                {
                    b.Property<long>("UserId");

                    b.Property<string>("About");

                    b.Property<string>("City");

                    b.Property<string>("Country");

                    b.Property<string>("PhotoUrl");

                    b.Property<double>("Price");

                    b.Property<int>("Status");

                    b.Property<string>("Title");

                    b.HasKey("UserId");

                    b.ToTable("Trainers");
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.TrainerSport", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("SportId");

                    b.Property<long>("TrainerId");

                    b.HasKey("Id");

                    b.HasIndex("SportId");

                    b.HasIndex("TrainerId");

                    b.ToTable("TrainerSports");
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.TrainerTeam", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("TeamId");

                    b.Property<long>("TrainerId");

                    b.HasKey("Id");

                    b.HasIndex("TeamId");

                    b.HasIndex("TrainerId");

                    b.ToTable("TrainerTeams");
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.Training", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("ClientId");

                    b.Property<DateTime?>("EndDate");

                    b.Property<DateTime>("StartDate");

                    b.Property<long>("TrainerSportId");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.HasIndex("TrainerSportId");

                    b.ToTable("Trainings");
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(20);

                    b.Property<bool>("IsDeleted");

                    b.Property<bool>("IsEmailConfirm");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<string>("PasswordHash")
                        .IsRequired();

                    b.Property<string>("Phone");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("Phone")
                        .IsUnique()
                        .HasFilter("[Phone] IS NOT NULL");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.UserRole", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("RoleId");

                    b.Property<long>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.Client", b =>
                {
                    b.HasOne("Sportlance.DAL.Entities.User", "User")
                        .WithOne()
                        .HasForeignKey("Sportlance.DAL.Entities.Client", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.Feedback", b =>
                {
                    b.HasOne("Sportlance.DAL.Entities.Training")
                        .WithOne("Feedback")
                        .HasForeignKey("Sportlance.DAL.Entities.Feedback", "TrainingId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.Role", b =>
                {
                    b.HasOne("Sportlance.DAL.Entities.User")
                        .WithMany("Roles")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.Team", b =>
                {
                    b.HasOne("Sportlance.DAL.Entities.User", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.TeamPhoto", b =>
                {
                    b.HasOne("Sportlance.DAL.Entities.Team", "Team")
                        .WithMany("TeamPhotos")
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.Trainer", b =>
                {
                    b.HasOne("Sportlance.DAL.Entities.User", "User")
                        .WithOne()
                        .HasForeignKey("Sportlance.DAL.Entities.Trainer", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.TrainerSport", b =>
                {
                    b.HasOne("Sportlance.DAL.Entities.Sport", "Sport")
                        .WithMany()
                        .HasForeignKey("SportId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Sportlance.DAL.Entities.Trainer")
                        .WithMany("TrainerSports")
                        .HasForeignKey("TrainerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.TrainerTeam", b =>
                {
                    b.HasOne("Sportlance.DAL.Entities.Team")
                        .WithMany("TrainerTeams")
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Sportlance.DAL.Entities.Trainer")
                        .WithMany("TrainerTeams")
                        .HasForeignKey("TrainerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.Training", b =>
                {
                    b.HasOne("Sportlance.DAL.Entities.Client", "Client")
                        .WithMany()
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Sportlance.DAL.Entities.TrainerSport")
                        .WithMany("Trainings")
                        .HasForeignKey("TrainerSportId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.UserRole", b =>
                {
                    b.HasOne("Sportlance.DAL.Entities.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Sportlance.DAL.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}