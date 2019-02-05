export interface TeamServiceOrderResponse {
  id: number;
  createDate: Date;
  customer?: any; // Кто купил
  team?: any; // Кто продал
  service: any; // Какая услуга
  price: number;
  status: number; // Переделать на Enum (Отмена: -1, Заказано: 0, В работе: 1, Выполнено: 2)
  cancelReason?: string; // Если отменено то почему
}
