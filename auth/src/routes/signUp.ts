import express,{Request,Response} from 'express';
import  { StatusCodes } from "http-status-codes";
const router=express.Router();
import {body,validationResult} from 'express-validator';
import {RequestValidationError} from "../errors/request-validation-error";
router.get('/signup',[body('email').toLowerCase().isEmail().withMessage(
    "Please enter a valid email address"
),body('password').trim().isLength({min:6,max:20}).withMessage("Password must have at least 6 characters and must not have more than 20 characters"
)],async (req:Request, res:Response) => {
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
       throw new RequestValidationError(errors.array());
    }
    
    const {email,password} = req.body;
   if(!email || typeof email !== "string" )
   {
      res.status(StatusCodes.BAD_REQUEST).send("Please provide a valid email address");
   }
   

});

export {router as SignUpRouter};