import {Publisher,Subjects,TicketCreatedEvent} from '@tixter/common'
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
   subject: Subjects.TicketCreated=Subjects.TicketCreated;
}