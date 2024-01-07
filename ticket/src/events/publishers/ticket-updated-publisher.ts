import {Publisher,Subjects,TicketUpdatedEvent} from '@tixter/common'
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
   subject: Subjects.TicketUpdated=Subjects.TicketUpdated;   
}