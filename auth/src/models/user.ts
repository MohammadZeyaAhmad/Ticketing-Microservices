import mongoose  from "mongoose";
import {Password} from "../services/password"
interface UserAttributes {
    email:string;
    password:string;
}
interface UserModel extends mongoose.Model<any> {
    build(attr: UserAttributes):any;
}

interface UserDoc extends mongoose.Document
{
    _id:string;
    email:string;
    password:string;
    createdAt:string;
    updatedAt:string;


}

const userSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        }
    },{timestamps:true}
);
userSchema.statics.build=(attrs:UserAttributes)=>{
  return new User(attrs);
}
userSchema.pre("save", async function () {

  if (!this.isModified("password")) return;
  this.password =await Password.toHash(this.password);
});
const User=mongoose.model<UserDoc,UserModel>('User',userSchema);

export {User};