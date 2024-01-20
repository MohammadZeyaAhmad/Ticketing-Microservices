import { Subjects, Publisher, PaymentCreatedEvent } from '@tixter/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
