﻿using System.Collections.Generic;

namespace Sportlance.WebAPI.Errors
{
    public class AppError
    {
        public AppError(
            ErrorCode errorCode,
            Dictionary<string, List<string>> fields = null,
            string message = null)
        {
            ErrorCode = errorCode.ToString();
            Fields = fields ?? new Dictionary<string, List<string>>();
            ErrorMsg = message;
        }

        public string ErrorCode { get; }

        public Dictionary<string, List<string>> Fields { get; }

        public string ErrorMsg { get; }
    }
}