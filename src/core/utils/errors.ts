import httpStatus from 'http-status-codes';

export interface CustomError extends Error {
  name: string;
  code: number;
}

export const BadRequest = class BadRequest extends Error implements CustomError {
  public name: string;
  public code: number;

  constructor(message: string) {
    super(message);

    this.name = 'Bad Request';
    this.code = httpStatus.BAD_REQUEST;
  }
};

export const InternalServerError = class InternalServerError extends Error implements CustomError {
  public name: string;
  public code: number;

  constructor(message: string) {
    super(message);

    this.name = 'Internal Server Error';
    this.code = httpStatus.INTERNAL_SERVER_ERROR;
  }
};

export const Conflict = class Conflict extends Error implements CustomError {
  public name: string;
  public code: number;

  constructor(message: string) {
    super(message);

    this.name = 'Conflict';
    this.code = httpStatus.CONFLICT;
  }
};

export const NotFound = class NotFound extends Error implements CustomError {
  public name: string;
  public code: number;

  constructor(message: string) {
    super(message);

    this.name = 'Not Found';
    this.code = httpStatus.NOT_FOUND;
  }
};

export const ServiceUnavailable = class ServiceUnavailable extends Error implements CustomError {
  public name: string;
  public code: number;

  constructor(message: string) {
    super(message);

    this.name = 'Service Unavailable';
    this.code = httpStatus.SERVICE_UNAVAILABLE;
  }
};

export const Unauthorized = class Unauthorized extends Error implements CustomError {
  public name: string;
  public code: number;

  constructor(message: string) {
    super(message);

    this.name = 'UNAUTHORIZED';
    this.code = httpStatus.UNAUTHORIZED;
  }
};

export const Forbidden = class Forbidden extends Error implements CustomError {
  public name: string;
  public code: number;

  constructor(message: string) {
    super(message);

    this.name = 'Forbidden';
    this.code = httpStatus.FORBIDDEN;
  }
};
