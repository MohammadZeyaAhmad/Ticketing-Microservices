import { Publisher, OrderCreatedEvent, Subjects } from '@tixter/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
