import express, { Request, Response, NextFunction } from 'express';
//Importante para permitir que o express trabalhe com erros assíncronos
import 'express-async-errors';
import { router } from './routes';
import './database';
import cors from 'cors';

const server = express();
server.use(cors());
server.use(express.json());
server.use(router);

server.use(
  async (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return res.status(400).json({
        error: err.message
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error here!'
    });
  }
);

export default server;
