import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
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
  secure:process.env.NODE_ENV !== 'test',
}))

app.use("/api/users",CurrentUserRouter);
app.use("/api/users",SignInRouter);
app.use("/api/users",SignOutRouter);
app.use("/api/users",SignUpRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export{app};
