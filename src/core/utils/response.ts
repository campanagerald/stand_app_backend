import { Response } from 'express';
import { CustomError } from './errors';

export const response = {
  error: (res: Response) => ({ message, code }: CustomError) =>
    res.status(code).json({
      message,
      data: null,
      code,
    }),
  ok: (res: Response) => (data: any) =>
    res.status(200).json({
      message: 'success',
      data: data,
      code: 200,
    }),
};
