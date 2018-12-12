﻿using System.Threading.Tasks;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Interfaces
{
    public interface IFeedbackService
    {
        Task<PagingCollection<ReviewInfo>> GetTrainerFeedbacksAsync(long trainerId, int offset, int count);
    }
}