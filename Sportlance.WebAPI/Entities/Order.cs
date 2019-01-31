using System;

namespace Sportlance.WebAPI.Entities
{
    public class Order
    {
        public long Id { get; set; }

        public DateTimeOffset CreateDate { get; set; }

        public DateTimeOffset UpdateDate { get; set; }

        public OrderStatus Status { get; set; }

        /// <summary>
        /// Заказ оплачен
        /// </summary>
        public bool IsPaid { get; set; }

        /// <summary>
        /// Идентификатор заказчика
        /// </summary>
        public long CustomerId { get; set; }

        /// <summary>
        /// Идентификатор исполнителя
        /// </summary>
        public long? ExecutorId { get; set; }

        /// <summary>
        /// Описание заказа
        /// </summary>
        public string Description { get; set; }

        public User Customer { get; set; }

        public User Executor { get; set; }
    }
}
