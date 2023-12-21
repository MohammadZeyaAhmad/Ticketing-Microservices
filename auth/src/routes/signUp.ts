import express,{Request,Response} from 'express';
import  { StatusCodes } from "http-status-codes";
const router=express.Router();
import {User} from "../models/user"
import {body,validationResult} from 'express-validator';
import {RequestValidationError} from "../errors/request-validation-error";
import {BadRequestError} from "../errors/bad-request-error";
router.post('/signup',[body('email').toLowerCase().isEmail().withMessage(
    "Please enter a valid email address"
),body('password').trim().isLength({min:6,max:20}).withMessage("Password must have at least 6 characters and must not have more than 20 characters"
)],async (req:Request, res:Response) => {
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
       throw new RequestValidationError(errors.array());
    }
    
    const  email:string=req.body.email;
    const  password:string=req.body.password;
   if(!email || typeof email !== "string" )
   {
      throw new BadRequestError("Please enter a valid email address")
   }
   const userExists=await User.findOne({email});
   if(userExists)
   {
     throw new BadRequestError("Email already in use");
   }
   const user=User.build({email,password});
   await user.save();
   res.status(StatusCodes.CREATED).json({result:user});
});

export {router as SignUpRouter};