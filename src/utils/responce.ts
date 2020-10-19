export enum ResponceStatus {
  OK = 'ok',
  ERROR = 'error',
}

export class ApiResponce<T> {
  public status: ResponceStatus;
  public error?: string;
  public data?: T;

  static createSuccess<T>(data: T): ApiResponce<T> {
    const self = new ApiResponce<T>();
    self.status = ResponceStatus.OK;
    self.data = data;
    return self;
  }

  static createError(error: string): ApiResponce<undefined> {
    const self = new ApiResponce<undefined>();
    self.status = ResponceStatus.ERROR;
    self.error = error;
    return self;
  }
}
