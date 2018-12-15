using System;

namespace Sportlance.WebAPI.Core.Utilities
{
    public class UtcDateTime : IDateTime
    {
        public DateTimeOffset UtcNow => DateTimeOffset.UtcNow;
    }
}