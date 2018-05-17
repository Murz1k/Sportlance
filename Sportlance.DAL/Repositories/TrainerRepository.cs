using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;

namespace Sportlance.DAL.Repositories
{
    public class TrainerRepository : ITrainerRepository
    {
        private readonly AppDBContext _appContext;

        public TrainerRepository(AppDBContext appContext)
        {
            _appContext = appContext;
        }

        public IQueryable<Trainer> Entities() => _appContext.Trainers;

        public async Task<IReadOnlyCollection<Trainer>> GetTrainersBySportId(long sportId)
        {
            return await (from trainer in _appContext.Trainers
                join trainerSport in _appContext.TrainerSports on trainer.UserId equals trainerSport.TrainerId
                join sport in _appContext.Sports on trainerSport.SportId equals sport.Id
                where sport.Id == sportId
                select trainer).Include(t => t.User).ToArrayAsync();
        }

        public async Task<IReadOnlyCollection<TrainerSport>> GetTrainersSportsByIds(IEnumerable<long> trainersIds)
        {
            return await (from trainerSport in _appContext.TrainerSports
                where trainersIds.Contains(trainerSport.TrainerId)
                select trainerSport).Include(i => i.Sport).Include(i => i.Trainer).ToArrayAsync();
        }

        public Task<Trainer> GetByIdAsync(long sportId)
            => _appContext.Trainers.Include(i => i.User).FirstOrDefaultAsync(i => i.UserId == sportId);

        public Task AddRangeAsync(IEnumerable<Trainer> entities)
            => _appContext.Trainers.AddRangeAsync(entities);

        public Task AddAsync(Trainer trainer)
        {
            return _appContext.Trainers.AddAsync(trainer);
        }

        public Task SaveChangesAsync()
            => _appContext.SaveChangesAsync();
    }
}