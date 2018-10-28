using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Sportlance.WebAPI.Errors;
using Sportlance.WebAPI.Exceptions;
using Sportlance.WebAPI.Responses;

namespace Sportlance.WebAPI.ExceptionHandler
{
    public class AppErrorsExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            if (context.Exception is AppErrorException appErrorsException)
                context.Result = new ObjectResult(new ErrorResponse(appErrorsException.Error) )
                {
                    StatusCode = (int) HttpStatusCode.OK
                };
            else
                context.Result =
                    new ObjectResult(new ErrorResponse(new AppError(ErrorCode.ServerError, context.Exception.ToString())))
                    {
                        StatusCode = (int) HttpStatusCode.InternalServerError
                    };
        }
    }
}