using System;
using Microsoft.AspNetCore.Mvc.Filters;
using Sportlance.WebAPI.Authentication;

namespace Sportlance.WebAPI.Filters
{
    public class AuthenticationFilterFactory : IFilterFactory
    {
        public bool IsReusable => false;

        public IFilterMetadata CreateInstance(IServiceProvider serviceProvider)
        {
            var authService = (AuthService) serviceProvider.GetService(typeof(AuthService));
            return new AuthenticationFilter(authService);
        }
    }
}