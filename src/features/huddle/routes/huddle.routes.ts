import express, { Request, Response } from 'express';

import Joi from 'joi';
import schemaValidator from '../../../core/middlewares/schema.validator';
import { response } from '../../../core/utils/response';
import handdleErrors from '../../../core/utils/handle.errors';
import CreateHuddle from '../domain/usecases/create.huddle';

const makeHuddleRoute = ({ createhuddle }: { createhuddle: CreateHuddle }) => {
  const router = express.Router();

  router.post(
    '/huddle',
    schemaValidator.body(
      Joi.object({
        name: Joi.string().required(),
        participantsEmails: Joi.array().required(),
      })
    ),
    async (req: Request, res: Response) => {
      try {
        const huddleEntity = await createhuddle.execute({
          name: req.body.name,
          participantsEmail: req.body.participantsEmail,
        });

        return response.ok(res)(huddleEntity);
      } catch (error) {
        return handdleErrors(res)(error);
      }
    }
  );

  return router;
};

export { makeHuddleRoute };
