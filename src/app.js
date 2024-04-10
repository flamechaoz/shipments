import express, { json, urlencoded } from 'express';
import cors from 'cors';
import router from './routes/v1/index.js';
import error from './middlewares/error.js';
import ApiError from './utils/ApiError.js';
import httpStatus from 'http-status';
const app = express();

// parse json request body
app.use(json());

// parse urlencoded request body
app.use(urlencoded({ extended: true }));

// enable cors
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:4173'],
    credentials: true,
  };
app.use(cors(corsOptions));

// v1 api routes
app.use('/v1', router);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(error.errorConverter);

// handle error
app.use(error.errorHandler);

export default app;
