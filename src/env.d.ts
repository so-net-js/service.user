declare namespace NodeJS {
  export interface ProcessEnv {
    SERVER_PORT: string;
    MICROSERVICE_PORT: string;
    DB_CONNECTION_STRING: string;
    JWT_SECRET: string;
    APP_ENV: 'production' | 'development';
  }
}
