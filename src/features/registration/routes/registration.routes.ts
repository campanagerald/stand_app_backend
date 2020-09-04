import express, { Request, Response } from 'express';

import Joi from 'joi';
import schemaValidator from '../../../core/middlewares/schema.validator';
import handdleErrors from '../../../core/utils/handle.errors';
import Signup from '../domain/usecases/signup';
import { response } from '../../../core/utils/response';

const makeRegistrationRoute = ({ signup }: { signup: Signup }) => {
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

        res.set('authorization', token);

        response.ok(res)(user);
      } catch (error) {
        return handdleErrors(error);
      }
    }
  );

  return router;
};

export { makeRegistrationRoute };
signup: Signup;
