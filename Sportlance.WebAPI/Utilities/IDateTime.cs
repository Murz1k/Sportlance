using System;

namespace Sportlance.WebAPI.Utilities
{
    public interface IDateTime
    {
        DateTimeOffset UtcNow { get; }
    }
}