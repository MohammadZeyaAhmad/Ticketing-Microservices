import express,{Request,Response} from 'express';
import  { StatusCodes } from "http-status-codes";
const router=express.Router();
import jwt from 'jsonwebtoken';
import {User} from "../models/user"
import {body} from 'express-validator';
import { validateRequest ,BadRequestError} from '@tixter/common';
import { Password } from '../services/password';
router.post('/signin',[body('email').toLowerCase().isEmail().withMessage(
    "Please enter a valid email address"
),body('password').trim().notEmpty().withMessage(
    "Please enter a valid email address"
)
],validateRequest, async (req:Request, res:Response) => {
    let email: string=req.body.email;
    let password:string=req.body.password;
    
    if(!email || typeof email !== "string" )
   {
      throw new BadRequestError("Please enter a valid email address")
   }
   let user=await User.findOne({email});
   if(!user)
   {
      throw new BadRequestError("Invalid Credentials");
   }
   let isPasswordValid=await Password.comparePassword(user.password,password);
   if(!isPasswordValid) {
    throw new BadRequestError("Invalid Credentials");
   }
  const userJWT=jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET!);
   req.session={jwt:userJWT};


   res.status(StatusCodes.OK).json({result:user});
});

export {router as SignInRouter};