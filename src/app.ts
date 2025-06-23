import createError from'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import { engine } from 'express-handlebars';

// import indexRouter from './routes/index';
import usersRouter from '@/routes/users';
import problemsRouter from '@/routes/problems';

import { connectMongo } from './util/mongoDB';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', engine({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connect DB
connectMongo('mydb');

// CORS
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
// app.use((req: Request, res: Response, next: NextFunction): void | Promise<void> => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization' 
//     );
//     if(req.method === 'OPTIONS') {
//       res.sendStatus(200);
//       return;
//     }

//     next();
// });

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/problems', problemsRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
