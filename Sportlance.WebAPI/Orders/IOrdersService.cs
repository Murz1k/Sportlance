using Sportlance.WebAPI.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sportlance.WebAPI.Orders
{
    public interface IOrdersService
    {
        /// <summary>
        /// Показать заказы для пользователя (заказчика)
        /// </summary>
        /// <param name="customerId">Идентификатор заказчика (пользователя)</param>
        /// <param name="status">Статус заказа</param>
        /// <returns></returns>
        Task<ICollection<Order>> GetByCustomerIdAsync(long customerId, OrderStatus? status = null);

        /// <summary>
        /// Показать заказы для команды
        /// </summary>
        /// <param name="teamId">Идентификатор команды</param>
        /// <param name="status">Статус заказа</param>
        /// <returns></returns>
        Task<ICollection<Order>> GetByTeamIdAsync(long teamId, OrderStatus? status = null);

        /// <summary>
        /// Показать заказы для тренера
        /// </summary>
        /// <param name="trainerId">Идентификатор тренера</param>
        /// <param name="status">Статус заказа</param>
        /// <returns></returns>
        Task<ICollection<Order>> GetByTrainerIdAsync(long trainerId, OrderStatus? status = null);

        /// <summary>
        /// Изменение статуса заказа
        /// </summary>
        /// <param name="orderId">Идентификатор заказа</param>
        /// <param name="executorId">Идентификатор исполнителя</param>
        /// <param name="status">Статус</param>
        /// <returns></returns>
        Task<Order> ChangeStatusByIdAsync(long orderId, long executorId, OrderStatus status);
    }
}