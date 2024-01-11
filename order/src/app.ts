import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler,NotFoundError,currentUser } from '@tixter/common';
import cookieSession  from 'cookie-session';
const app = express();
import {indexOrderRouter} from './routes/index';
import {newOrderRouter} from './routes/new';
import {showOrderRouter} from './routes/show';
import {deleteOrderRouter} from './routes/delete';

app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed:false,
  secure:process.env.NODE_ENV !== 'test',
}))

app.use(currentUser);


app.use(indexOrderRouter);
app.use(showOrderRouter);
app.use(newOrderRouter);
app.use(deleteOrderRouter);


app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export{app};
