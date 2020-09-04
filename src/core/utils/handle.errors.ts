import { Response } from 'express';

import { response } from './response';
import { InternalServerError, NotFound, BadRequest, Conflict, ServiceUnavailable, CustomError, Forbidden, Unauthorized } from './errors';

export default (res: Response) => (error: CustomError) => {
  console.log(`${error.name}: ${error.message}`);

  if (error.name === 'NotFound' || error.name === 'BadRequest' || error.name === 'Conflict' || error.name === 'ServiceUnavailable' || error.name === 'Forbidden' || error.name === 'Unauthorized') {
    return response.error(res)(error);
  }

  return response.error(res)(new InternalServerError(error.message));
};
