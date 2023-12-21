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

const app = express();
app.use(json());

app.use("/api/users",CurrentUserRouter);
app.use("/api/users",SignInRouter);
app.use("/api/users",SignOutRouter);
app.use("/api/users",SignUpRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start=async () => {
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
