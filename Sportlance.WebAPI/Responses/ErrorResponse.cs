using System.Collections.Generic;
using Sportlance.WebAPI.Exceptions;

namespace Sportlance.WebAPI.Responses
{
    public class ErrorResponse
    {
        public ErrorResponse(AppErrorException error)
        {
            ErrorCode = error.Error.ErrorCode;
            ErrorMsg = error.Error.ErrorMsg;
        }
        
        public string ErrorCode { get; }

        public Dictionary<string, List<string>> Fields { get; }

        public string ErrorMsg { get; }
    }
}