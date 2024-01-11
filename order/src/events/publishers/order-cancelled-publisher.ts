import { Subjects, Publisher, OrderCancelledEvent } from '@tixter/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
