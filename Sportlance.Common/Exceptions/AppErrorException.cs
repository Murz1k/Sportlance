using System;
using Sportlance.Common.Errors;

namespace Sportlance.Common.Exceptions
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