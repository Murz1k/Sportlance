namespace Sportlance.WebAPI.Entities
{
    public enum OrderStatus
    {
        /// <summary>
        /// Готов к работе
        /// </summary>
        Ready = 1,

        /// <summary>
        /// В работе
        /// </summary>
        InWork = 2,

        /// <summary>
        /// Завершен
        /// </summary>
        Completed = 3,

        /// <summary>
        /// Отменен
        /// </summary>
        Canceled = -1
    }
}
