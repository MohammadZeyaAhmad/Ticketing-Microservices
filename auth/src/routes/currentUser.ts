import express,{Request,Response} from 'express';
import  { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import {User} from "../models/user"
const router=express.Router();
router.get('/current', (req:Request, res:Response) => {
   if(!req.session?.jwt)
   {
      return  res.status(StatusCodes.METHOD_NOT_ALLOWED).send({message:"User not logged in"});
   }
   try
   {
   const payload=jwt.verify(req.session.jwt,process.env.JWT_SECRET!);
     res.status(200).json({result:payload});
   }
   catch(err)
   {
      return  res.status(StatusCodes.UNAUTHORIZED).send({message:"Authentication failed"});
   }
   
});

export {router as CurrentUserRouter};