using System;
using Sportlance.WebAPI.Errors;

namespace Sportlance.WebAPI.Exceptions
{
    public class AppErrorException : Exception
    {
        public AppErrorException(AppError error)
        {
            Error = error;
        }

        public AppError Error { get; }
    }
}
