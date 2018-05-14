using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sportlance.DAL.Entities;

namespace Sportlance.DAL.Interfaces
{
    public interface ITrainerSportRepository
    {
        IQueryable<TrainerSport> Entities();
    }
}
