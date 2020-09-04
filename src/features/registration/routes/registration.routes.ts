import express, { Request, Response } from 'express';

import Joi from 'joi';
import schemaValidator from '../../../core/middlewares/schema.validator';
import handdleErrors from '../../../core/utils/handle.errors';
import Signup from '../domain/usecases/signup';
import { response } from '../../../core/utils/response';

const makeRegistrationRoutes = ({ signup }: { signup: Signup }) => {
  const router = express.Router();

  router.post(
    '/signup',
    schemaValidator.body(
      Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      })
    ),
    async (req: Request, res: Response) => {
      try {
        const { user, token } = await signup.execute(req.body);

        res.set('authorization', `Bearer ${token}`);

        return response.ok(res)(Object.assign({}, { ...user, password: null }));
      } catch (error) {
        return handdleErrors(res)(error);
      }
    }
  );

  return router;
};

export { makeRegistrationRoutes };
