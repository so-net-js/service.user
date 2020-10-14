import { HttpStatus } from '@nestjs/common';
import { Server } from 'http';

export class ServerError extends Error {
  constructor(
    message: string,
    private readonly httpCode: HttpStatus,
    private readonly errorCode: string,
  ) {
    super(message);
  }
}

export class InternalServerError extends ServerError {
  static create(message: string, errCode: string) {
    return new InternalServerError(
      message,
      HttpStatus.INTERNAL_SERVER_ERROR,
      errCode,
    );
  }
}
