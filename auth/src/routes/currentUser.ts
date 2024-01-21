import express,{Request,Response} from 'express';
import  { StatusCodes } from "http-status-codes";
import { currentUser,requireAuth } from '@tixter/common';

const router=express.Router();
router.get('/current',currentUser,requireAuth,(req:Request, res:Response) => {
  
      return  res.status(StatusCodes.OK).json({result: req.user||null});
   
});

export {router as CurrentUserRouter};