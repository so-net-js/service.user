// import { HttpStatus } from '@nestjs/common';

import { HttpException, HttpStatus } from '@nestjs/common';

// export class ServerError extends Error {
//   constructor(
//     message: string,
//     private readonly httpCode: HttpStatus,
//     private readonly errorCode: string,
//   ) {
//     super(message);
//   }

//   getMessage(): string {
//     return `${this.message}. ErrorCode: ${this.errorCode}`;
//   }
// }

// export class InternalServerError extends ServerError {
//   static create(message: string, errCode: string) {
//     return new InternalServerError(
//       message,
//       HttpStatus.INTERNAL_SERVER_ERROR,
//       errCode,
//     );
//   }
// }

export class ServerError extends HttpException {
  constructor(
    message: string,
    httpCode: HttpStatus,
    private readonly code: string,
  ) {
    super(message, httpCode);
  }

  static create(code: string) {
    return new ServerError(
      'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
      code,
    );
  }
}
