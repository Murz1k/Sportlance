using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.Common.Errors;
using Sportlance.Common.Exceptions;
using Sportlance.Common.Models;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Feedbacks
{
    public class FeedbackService : IFeedbackService
    {
        private readonly AppDbContext _appContext;

        public FeedbackService(AppDbContext appContext)
        {
            _appContext = appContext;
        }

        public async Task<PagingCollection<ReviewInfo>> GetTrainerFeedbacksAsync(long trainerId, int offset, int count)
        {
            var query = (from trainer in _appContext.Trainers
                         where trainer.UserId == trainerId
                         join trainerSport in _appContext.TrainerSports on trainer.UserId equals trainerSport.TrainerId
                         join training in _appContext.Trainings.Include(i => i.Client)
                             .Include(i => i.Feedback) on trainerSport.Id equals training.TrainerSportId
                         where training.Feedback != null
                         select training)
                .OrderByDescending(i => i.Feedback.CreateDate);

            var entities = await query.Skip(offset).Take(count).ToArrayAsync();

            var totalCount = await query.CountAsync();

            return new PagingCollection<ReviewInfo>(entities.Select(i =>
                new ReviewInfo
                {
                    ClientName = i.Client.FirstName,
                    Score = i.Feedback.Score,
                    Description = i.Feedback.Description,
                    CreateDate = i.Feedback.CreateDate
                }).ToArray(), totalCount, offset);
        }

        public async Task AddMainFeedbackAsync(long? userId, string firstName, string email, string comment)
        {
            Feedback newFeedback;

            if (userId.HasValue)
            {
                var user = await _appContext.Users.FirstOrDefaultAsync(i => i.Id == userId);

                if (user == null)
                {
                    throw new AppErrorException(ErrorCode.UserNotFound);
                }

                newFeedback = new Feedback
                {
                    UserId = userId,
                    FirstName = firstName,
                    Comment = comment,
                    CreateDate = DateTime.Now,
                    Email = email
                };
            }
            else
            {
                newFeedback = new Feedback
                {
                    FirstName = firstName,
                    Comment = comment,
                    CreateDate = DateTime.Now,
                    Email = email
                };
            }

            await _appContext.Feedbacks.AddAsync(newFeedback);

            await _appContext.SaveChangesAsync();
        }
    }
}