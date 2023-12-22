import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose  from 'mongoose';
import { CurrentUserRouter } from './routes/currentUser';
import { SignInRouter} from './routes/signIn';
import {SignOutRouter } from './routes/signOut';
import { SignUpRouter } from './routes/signUp';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import cookieSession  from 'cookie-session';
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed:false,
  secure:true,
}))

app.use("/api/users",CurrentUserRouter);
app.use("/api/users",SignInRouter);
app.use("/api/users",SignOutRouter);
app.use("/api/users",SignUpRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start=async () => {
   if(!process.env.JWT_SECRET)
   {
      throw new Error("Error Loading env");
   }
  try {
  await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
  }
  catch(err)
  {
    console.log(err);
  }
};
start();
app.listen(3000, () => {
  console.log('Listening on port 3000!!!!!!!!');
});
