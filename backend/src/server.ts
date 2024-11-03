import express, { Express, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes';

const app: Express = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use(router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {

    res.status(err.statusCode || 500).json({
        error: err.message,
    });

});

export default app;