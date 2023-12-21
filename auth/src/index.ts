import express from 'express';
import {json} from 'body-parser'
import 'express-async-errors'
import { CurrentUserRouter } from './routes/currentUser';
import { SignInRouter } from './routes/signIn';
import { SignOutRouter } from './routes/signOut';
import { SignUpRouter } from './routes/signUp';
import {errorHandler} from "./middlewares/error-handler";
import {NotFoundError} from "./errors/not-found-error"
const app = express();
app.use(json);
app.use("api/users",CurrentUserRouter);
app.use("api/users",SignInRouter);
app.use("api/users",SignOutRouter);
app.use("api/users",SignUpRouter);
app.all("*",async ()=>{
  throw new NotFoundError();
});
app.use(errorHandler);
app.listen(3000, () => {
console.log('listening on port 3000 !!!');
})
