using System;

namespace Sportlance.WebAPI.Utilities
{
    public class UtcDateTime : IDateTime
    {
        public DateTimeOffset UtcNow => DateTimeOffset.UtcNow;
    }
}