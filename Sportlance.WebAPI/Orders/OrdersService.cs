using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sportlance.Common.Errors;
using Sportlance.Common.Exceptions;
using Sportlance.WebAPI.Core;
using Sportlance.WebAPI.Entities;

namespace Sportlance.WebAPI.Orders
{
    public class OrdersService : IOrdersService
    {
        private readonly AppDbContext _appContext;

        public OrdersService(AppDbContext appContext)
        {
            _appContext = appContext;
        }

        /// <summary>
        /// Показать заказы для пользователя (заказчика)
        /// </summary>
        /// <param name="customerId">Идентификатор заказчика (пользователя)</param>
        /// <param name="status">Статус заказа</param>
        /// <returns></returns>
        public async Task<ICollection<Order>> GetByCustomerIdAsync(long customerId, OrderStatus? status = null)
        {
            return await _appContext.Orders.Where(i => i.CustomerId == customerId
            && (!status.HasValue || i.Status == status.Value)
            ).ToListAsync();
        }

        /// <summary>
        /// Показать заказы для команды
        /// </summary>
        /// <param name="teamId">Идентификатор команды</param>
        /// <param name="status">Статус заказа</param>
        /// <returns></returns>
        public async Task<ICollection<Order>> GetByTeamIdAsync(long teamId, OrderStatus? status = null)
        {
            return await _appContext.Orders.Where(i => i.CustomerId == teamId
            && (!status.HasValue || i.Status == status.Value)
            ).ToListAsync();
        }

        /// <summary>
        /// Показать заказы для тренера
        /// </summary>
        /// <param name="trainerId">Идентификатор тренера</param>
        /// <param name="status">Статус заказа</param>
        /// <returns></returns>
        public async Task<ICollection<Order>> GetByTrainerIdAsync(long trainerId, OrderStatus? status = null)
        {
            return await _appContext.Orders.Where(i => i.CustomerId == trainerId
            && (!status.HasValue || i.Status == status.Value)
            ).ToListAsync();
        }

        /// <summary>
        /// Изменение статуса заказа
        /// </summary>
        /// <param name="orderId">Идентификатор заказа</param>
        /// <param name="executorId">Идентификатор исполнителя</param>
        /// <param name="status">Статус</param>
        /// <returns></returns>
        public async Task<Order> ChangeStatusByIdAsync(long orderId, long executorId, OrderStatus status)
        {
            var order = await _appContext.Orders.Include(i => i.Executor).FirstOrDefaultAsync(i => i.Id == orderId);
            if (order == null)
            {
                throw new AppErrorException(ErrorCode.OrderNotFound);
            }

            if (order.ExecutorId.HasValue)
            {
                if(order.ExecutorId.Value != executorId)
                {
                    throw new AppErrorException(ErrorCode.UserAccessDenied);
                }
            }
            else
            {
                order.ExecutorId = executorId;
            }

            order.Status = status;

            await _appContext.SaveChangesAsync();

            return order;
        }
    }
}