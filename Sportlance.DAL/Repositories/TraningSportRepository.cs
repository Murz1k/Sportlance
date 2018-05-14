using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sportlance.DAL.Core;
using Sportlance.DAL.Entities;
using Sportlance.DAL.Interfaces;

namespace Sportlance.DAL.Repositories
{
    public class TrainerSportRepository : ITrainerSportRepository
    {
        private readonly AppDBContext _context;

        public TrainerSportRepository(AppDBContext context)
        {
            _context = context;
        }

        public IQueryable<TrainerSport> Entities() => _context.TrainerSports;
    }
}