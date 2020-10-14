declare namespace NodeJS {
  export interface ProcessEnv {
    SERVER_PORT: string;
    MICROSERVICE_PORT: string;
    DB_USERNAME: string;
    DB_DATABASE_NAME: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: string;
    JWT_SECRET: string;
    APP_ENV: 'production' | 'development';
  }
}
