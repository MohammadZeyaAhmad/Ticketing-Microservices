import express,{Request,Response} from 'express';
import jwt from 'jsonwebtoken';
import  { StatusCodes } from "http-status-codes";
const router=express.Router();
import {User} from "../models/user"
import {body} from 'express-validator';
import {BadRequestError,validateRequest} from "@tixter/common";
router.post('/signup',[body('email').toLowerCase().isEmail().withMessage(
    "Please enter a valid email address"
),body('password').trim().isLength({min:6,max:20}).withMessage("Password must have at least 6 characters and must not have more than 20 characters"
)],validateRequest,async (req:Request, res:Response) => {
    
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
   const userJWT=jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET!);
   req.session={jwt:userJWT};


   res.status(StatusCodes.CREATED).json({result:user});
});

export {router as SignUpRouter};