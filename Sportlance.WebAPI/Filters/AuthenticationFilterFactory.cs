using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Sportlance.WebAPI.Authentication;

namespace Sportlance.WebAPI.Filters
{
    public class AuthenticationFilterFactory : IFilterFactory
    {
        public bool IsReusable => false;

        public IFilterMetadata CreateInstance(IServiceProvider serviceProvider)
        {
            var authService = (AuthService)serviceProvider.GetService(typeof(AuthService));
            return new AuthenticationFilter(authService);
        }
    }
}
