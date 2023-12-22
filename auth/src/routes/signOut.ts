import express,{Request,Response} from 'express';
import  { StatusCodes } from "http-status-codes";
const router=express.Router();
router.post('/signout', (req:Request, res:Response) => {
   req.session=null;
    res.status(StatusCodes.OK).json({message:"User logged out"});
});

export {router as SignOutRouter};