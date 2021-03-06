﻿using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Sportlance.Common.Errors;
using Sportlance.Common.Exceptions;
using Sportlance.Common.Models;

namespace Sportlance.WebAPI.Core.ExceptionHandler
{
    public class AppErrorsExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            if (context.Exception is AppErrorException appErrorsException)
                if (appErrorsException.Error.Code == ErrorCode.AuthenticationError.ToString())
                {
                    context.Result = new UnauthorizedResult();
                }
                else
                {
                    context.Result = new ObjectResult(new ErrorResponse(appErrorsException.Error))
                    {
                        StatusCode = (int) HttpStatusCode.OK
                    };
                }
            else
                context.Result =
                    new ObjectResult(
                        new ErrorResponse(new AppError(ErrorCode.ServerError, context.Exception.ToString())))
                    {
                        StatusCode = (int) HttpStatusCode.InternalServerError
                    };
        }
    }
}