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
        private readonly IReadOnlyDataContext _readContext;
        private readonly IEditableDataContext _editContext;

        public TrainerRepository(IReadOnlyDataContext readContext, IEditableDataContext editContext)
        {
            _readContext = readContext;
            _editContext = editContext;
        }

        public async Task<IReadOnlyCollection<Trainer>> GetTrainersBySportId(long sportId)
        {
            return await (from trainer in _readContext.Trainers
                join trainerSport in _readContext.TrainerSports on trainer.UserId equals trainerSport.TrainerId
                join sport in _readContext.Sports on trainerSport.SportId equals sport.Id
                where sport.Id == sportId
                select trainer).ToArrayAsync();
        }

        public async Task<IReadOnlyCollection<TrainerSports>> GetTrainersSportsByIds(IEnumerable<long> trainersIds)
        {
            return await (from trainerSport in _readContext.TrainerSports
                where trainersIds.Contains(trainerSport.TrainerId)
                select trainerSport).ToArrayAsync();
        }

        public Task<Trainer> GetByIdAsync(long sportId)
            => _readContext.Trainers.FirstOrDefaultAsync(i => i.UserId == sportId);

        public async Task<int> AddRangeAsync(IEnumerable<Trainer> entities)
        {
            await _editContext.Trainers.AddRangeAsync(entities);
            return await _editContext.SaveAsync();
        }


        public async Task<IReadOnlyCollection<Trainer>> GetAllAsync()
        {
            return await _readContext.Trainers.ToArrayAsync();
        }
    }
}