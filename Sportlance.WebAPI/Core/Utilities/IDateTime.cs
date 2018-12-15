using System;

namespace Sportlance.WebAPI.Core.Utilities
{
    public interface IDateTime
    {
        DateTimeOffset UtcNow { get; }
    }
}