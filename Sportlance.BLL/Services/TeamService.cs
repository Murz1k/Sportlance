using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.BLL.Entities;
using Sportlance.BLL.Interfaces;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;

namespace Sportlance.BLL.Services
{
    public class TeamService: ITeamService
    {
        private readonly AppDBContext _appContext;

        public TeamService(AppDBContext appContext)
        {
            _appContext = appContext;
        }
        

        public async Task AddAsync(long authorId)
        {
            await _appContext.AddAsync(new Team {AuthorId = authorId});
            await _appContext.SaveChangesAsync();
        }

        public async Task UpdateAboutAsync(long teamId, string about)
        {
            var team = await _appContext.Teams.FirstOrDefaultAsync(i => i.Id == teamId);
            team.About = about;
            await _appContext.SaveChangesAsync();
        }

        public async Task<TeamProfile> GetByAuthorId(long userId)
        {
            var team = await _appContext.Teams
                .FirstOrDefaultAsync(i => i.AuthorId == userId);
            return new TeamProfile
            {
                Id = team.Id,
                Title = team.Title,
                SubTitle = team.SubTitle,
                City = team.City,
                Country = team.Country,
                PhotoUrl = team.PhotoUrl,
                About = team.About,
                Status = team.Status,
//                Score = team.TrainerSports.SelectMany(i => i.Trainings).Average(f => f.Feedback?.Score),
//                Reviews = trainer.TrainerSports.SelectMany(i => i.Trainings).Where(i => i.Feedback != null)
//                    .OrderByDescending(i => i.Feedback.CreateDate).Select(i =>
//                        new ReviewInfo
//                        {
//                            ClientName = i.Client.User.FirstName,
//                            Score = i.Feedback.Score,
//                            Description = i.Feedback.Description,
//                            CreateDate = i.Feedback.CreateDate
//                        }).ToArray(),
//                Sports = trainer.TrainerSports.Select(i => i.Sport).ToArray(),
//                TrainingsCount = trainer.TrainerSports.SelectMany(i => i.Trainings).Count()
            };
        }

        public async Task<TeamProfile> GetById(long teamId)
        {
            var team = await _appContext.Teams
                .FirstOrDefaultAsync(i => i.Id == teamId);
            return new TeamProfile
            {
                Id = team.Id,
                Title = team.Title,
                SubTitle = team.SubTitle,
                City = team.City,
                Country = team.Country,
                PhotoUrl = team.PhotoUrl,
                About = team.About,
                Status = team.Status,
//                Score = team.TrainerSports.SelectMany(i => i.Trainings).Average(f => f.Feedback?.Score),
//                Reviews = trainer.TrainerSports.SelectMany(i => i.Trainings).Where(i => i.Feedback != null)
//                    .OrderByDescending(i => i.Feedback.CreateDate).Select(i =>
//                        new ReviewInfo
//                        {
//                            ClientName = i.Client.User.FirstName,
//                            Score = i.Feedback.Score,
//                            Description = i.Feedback.Description,
//                            CreateDate = i.Feedback.CreateDate
//                        }).ToArray(),
//                Sports = trainer.TrainerSports.Select(i => i.Sport).ToArray(),
//                TrainingsCount = trainer.TrainerSports.SelectMany(i => i.Trainings).Count()
            };
        }
    }
}