import mongoose  from "mongoose";

interface TicketAttributes {
    title:string;
    price:number;
    userId:string;
};
interface TicketModel extends mongoose.Model<any> {
    build(attr: TicketAttributes):any;
}

interface TicketDoc extends mongoose.Document
{
    _id:string;
    title:string;
    price:string;
    userId:string;
    createdAt:string;
    updatedAt:string;


}

const ticketSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
       price:{
        type:Number,
        required:true,
       },
       userId: {
      type: String,
      required: true,
    },
    },{timestamps:true,toJSON:{
        transform(doc,ret)
        {
            ret.id=ret._id;
            delete ret._id;
            delete ret.__v;

        }
    }}
);
ticketSchema.statics.build=(attrs:TicketAttributes)=>{
  return new Ticket(attrs);
}

const Ticket=mongoose.model<TicketDoc,TicketModel>('Ticket',ticketSchema);

export {Ticket};