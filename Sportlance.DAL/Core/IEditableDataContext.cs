﻿using System;
using System.Collections.Generic;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Sportlance.DAL.Entities;

namespace Sportlance.DAL.Core
{
    public interface IEditableDataContext : IDisposable
    {
        DbSet<MediaTypeNames.Application> Applications { get; }
        DbSet<Project> Projects { get; }
        DbSet<Scoring> Scorings { get; }
        DbSet<ScoringOffer> ScoringOffers { get; }
        DbSet<AreaScoring> AreaScorings { get; }
        DbSet<EstimateComment> EstimateComments { get; }
        DbSet<TeamMember> TeamMembers { get; }
        DbSet<Question> Questions { get; }
        DbSet<Voting> Votings { get; }
        DbSet<VotingProject> VotingProjects { get; }
        DbSet<User> Users { get; }
        DbSet<Role> Roles { get; }
        DbSet<UserRole> UserRoles { get; }
        DbSet<Area> Areas { get; }
        DbSet<Expert> Experts { get; }
        DbSet<ExpertArea> ExpertAreas { get; }
        DbSet<ExpertApplication> ExpertApplications { get; }
        DbSet<ExpertApplicationArea> ExpertApplicationAreas { get; }

        Task<int> SaveAsync();
        EntityEntry<T> Entity<T>(T x) where T : class;
        DbSet<T> DbSet<T>() where T : class;
    }
}
