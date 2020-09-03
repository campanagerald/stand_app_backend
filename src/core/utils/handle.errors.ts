import { Response } from 'express';

import { response } from './response';
import { InternalServerError, NotFound, BadRequest, Conflict, ServiceUnavailable, CustomError, Forbidden, Unauthorized } from './errors';

export default (res: Response) => (error: CustomError) => {
  console.log(error);

  if (error instanceof NotFound || error instanceof BadRequest || error instanceof Conflict || error instanceof ServiceUnavailable || error instanceof Forbidden || error instanceof Unauthorized) {
    return response.error(res)(error);
  }

  return response.error(res)(new InternalServerError(error.message));
};
