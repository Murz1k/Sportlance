using Microsoft.AspNetCore.Mvc;
using Sportlance.Common.Extensions;
using Sportlance.WebAPI.Entities;
using System.Threading.Tasks;

namespace Sportlance.WebAPI.Orders
{
    public class OrdersController : Controller
    {
        private readonly IOrdersService _ordersService;

        public OrdersController(IOrdersService ordersService)
        {
            _ordersService = ordersService;
        }
        
        [HttpGet("teams/{teamId}/orders")]
        public async Task<IActionResult> GetOrdersByTeamId(long teamId)
        {
            return Ok(await _ordersService.GetByTeamIdAsync(teamId));
        }

        [HttpGet("trainers/{trainerId}/orders")]
        public async Task<IActionResult> GetOrdersByTrainerId(long trainerId)
        {
            return Ok(await _ordersService.GetByTrainerIdAsync(trainerId));
        }

        [HttpGet("users/my-orders")]
        public async Task<IActionResult> GetMyOrders()
        {
            return Ok(await _ordersService.GetByCustomerIdAsync(User.GetUserId()));
        }

        [HttpGet("orders/{orderId}")]
        public async Task<IActionResult> ChangeOrderStatus(long orderId, OrderStatus status)
        {
            return Ok(await _ordersService.ChangeStatusByIdAsync(orderId, User.GetUserId(), status));
        }
    }
}