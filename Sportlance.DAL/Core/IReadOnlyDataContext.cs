﻿using System;
using System.Linq;
using Sportlance.DAL.Entities;

namespace Sportlance.DAL.Core
{
    public interface IReadOnlyDataContext : IDisposable
    {
        IQueryable<User> Users { get; }
        IQueryable<Sport> Sports { get; }
        IQueryable<Trainer> Trainers { get; }
        IQueryable<TrainerSports> TrainerSports { get; }
        IQueryable<Review> Reviews { get; }
        IQueryable<Training> Trainings { get; }

        IQueryable<T> GetAll<T>() where T : class;
    }
}
