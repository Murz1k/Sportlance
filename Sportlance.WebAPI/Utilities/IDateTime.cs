using System;

namespace Sportlance.WebAPI.Utilities
{
    public interface IDateTime
    {
        DateTime UtcNow { get; }
    }
}
