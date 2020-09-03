import { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';

import handdleErrors from '../utils/handle.errors';
import { BadRequest } from '../utils/errors';

export default {
  body: (schema: ObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      return next();
    } catch (error) {
      return handdleErrors(res)(new BadRequest(error.message));
    }
  },
};
