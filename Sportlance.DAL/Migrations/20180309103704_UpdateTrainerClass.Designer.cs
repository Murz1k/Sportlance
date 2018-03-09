﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;
using System;

namespace Sportlance.DAL.Migrations
{
    [DbContext(typeof(AppDBContext))]
    [Migration("20180309103704_UpdateTrainerClass")]
    partial class UpdateTrainerClass
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Sportlance.DAL.Entities.Sport", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Sports");
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.Trainer", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("City");

                    b.Property<string>("Country");

                    b.Property<string>("FirstName");

                    b.Property<string>("PhotoUrl");

                    b.Property<string>("SecondName");

                    b.Property<long>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Trainers");
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.TrainerSports", b =>
                {
                    b.Property<long>("SportId");

                    b.Property<long>("TrainerId");

                    b.Property<double>("Price");

                    b.Property<int>("TaxType");

                    b.HasKey("SportId", "TrainerId");

                    b.HasIndex("TrainerId");

                    b.ToTable("TrainerSports");
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.Trainer", b =>
                {
                    b.HasOne("Sportlance.DAL.Entities.User", "User")
                        .WithOne("Trainer")
                        .HasForeignKey("Sportlance.DAL.Entities.Trainer", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Sportlance.DAL.Entities.TrainerSports", b =>
                {
                    b.HasOne("Sportlance.DAL.Entities.Sport", "Sport")
                        .WithMany("TrainerSports")
                        .HasForeignKey("SportId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Sportlance.DAL.Entities.Trainer", "Trainer")
                        .WithMany("TrainerSports")
                        .HasForeignKey("TrainerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
