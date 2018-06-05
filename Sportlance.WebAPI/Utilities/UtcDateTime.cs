using System;

namespace Sportlance.WebAPI.Utilities
{
    public class UtcDateTime : IDateTime
    {
        public DateTime UtcNow => DateTime.UtcNow;
    }
}