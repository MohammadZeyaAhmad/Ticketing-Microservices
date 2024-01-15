import { Subjects,Publisher,ExpirationCompleteEvent } from "@tixter/common";
export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject:Subjects.ExpirationComplete=Subjects.ExpirationComplete;
    
}