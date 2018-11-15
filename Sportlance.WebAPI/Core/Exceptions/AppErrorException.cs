using System;
using Sportlance.WebAPI.Core.Errors;
using Sportlance.WebAPI.Errors;

namespace Sportlance.WebAPI.Exceptions
{
    public class AppErrorException : Exception
    {
        public AppErrorException(ErrorCode code)
        {
            Error = new AppError(code);
        }

        public AppErrorException(AppError error)
        {
            Error = error;
        }

        public AppError Error { get; }
    }
}