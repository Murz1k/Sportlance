﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sportlance.DAL.Interfaces;
using Sportlance.WebAPI.Errors;
using Sportlance.WebAPI.Exceptions;
using Sportlance.WebAPI.Extensions;
using Sportlance.WebAPI.Requests;
using Sportlance.WebAPI.Responses;

namespace Sportlance.WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class ProfileController : Controller
    {
        private readonly IUserRepository _userRepository;

        public ProfileController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet, Route("current"), Authorize]
        public async Task<CheckUserResponse> GetCurrentAsync()
        {
            var user = await _userRepository.GetByIdAsync(User.GetUserId());
            if (user == null)
            {
                throw new AppErrorException(new AppError(ErrorCode.UserNotFound));
            }

            if (!user.IsEmailConfirm)
            {
                throw new AppErrorException(new AppError(ErrorCode.EmailIsNotConfirmed));
            }

            return new CheckUserResponse
            {
                Email = user.Email
            };
        }
    }
}