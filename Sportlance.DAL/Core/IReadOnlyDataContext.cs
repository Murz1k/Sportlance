using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Text;
using Sportlance.DAL.Entities;

namespace Sportlance.DAL.Core
{
    public interface IReadOnlyDataContext : IDisposable
    {
        IQueryable<MediaTypeNames.Application> Applications { get; }
        IQueryable<Project> Projects { get; }
        IQueryable<Scoring> Scorings { get; }
        IQueryable<ScoringOffer> ScoringOffers { get; }
        IQueryable<AreaScoring> AreaScorings { get; }
        IQueryable<EstimateComment> EstimateComments { get; }
        IQueryable<TeamMember> TeamMembers { get; }
        IQueryable<Question> Questions { get; }
        IQueryable<Voting> Votings { get; }
        IQueryable<VotingProject> VotingProjects { get; }
        IQueryable<User> Users { get; }
        IQueryable<Role> Roles { get; }
        IQueryable<UserRole> UserRoles { get; }
        IQueryable<Area> Areas { get; }
        IQueryable<Expert> Experts { get; }
        IQueryable<ExpertArea> ExpertAreas { get; }
        IQueryable<ExpertApplication> ExpertApplications { get; }
        IQueryable<ExpertApplicationArea> ExpertApplicationAreas { get; }

        IQueryable<T> GetAll<T>() where T : class;
    }
}
