using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;

namespace Sportlance.DAL.Repositories
{
    public class ReviewRepository : EntityCrudRepository<Review>, IReviewRepository
    {
        public ReviewRepository(IReadOnlyDataContext readContext, IEditableDataContext editContext) : base(readContext,
            editContext)
        {
        }

        public async Task<IReadOnlyCollection<Review>> GetByTrainerIdAsync(long trainerId)
        {
            return await (from review in ReadContext.Reviews
                join training in ReadContext.Trainings on review.TrainingId equals training.Id
                join trainingSport in ReadContext.TrainerSports on training.TrainerSportId equals trainingSport.Id
                where trainingSport.TrainerId == trainerId
                select review).ToArrayAsync();
        }
    }
}