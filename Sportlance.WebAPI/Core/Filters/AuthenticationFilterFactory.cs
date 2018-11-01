using System;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Sportlance.WebAPI.Authentication;
using Sportlance.WebAPI.Users;

namespace Sportlance.WebAPI.Core.Filters
{
    public class AuthenticationFilterFactory : IFilterFactory
    {
        public bool IsReusable => false;

        public IFilterMetadata CreateInstance(IServiceProvider serviceProvider)
        {
            return new AuthenticationFilter(
                serviceProvider.GetService<IAuthService>(),
                serviceProvider.GetService<IUserService>()
                );
        }
    }
}