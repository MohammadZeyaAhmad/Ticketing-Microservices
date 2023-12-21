import express,{Request,Response} from 'express';
const router=express.Router();
router.get('/current', (req:Request, res:Response) => {
   res.status(200).send({msg:"Hii there current user"});
});

export {router as CurrentUserRouter};