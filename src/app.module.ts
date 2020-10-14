import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { LoginController } from './login/login.controller';
import { RegisterController } from './register/register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './repositories/user.repo';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      entities: [User],
      synchronize: process.env.APP_ENV === 'development',
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController, LoginController, RegisterController],
  providers: [AppService, RegisterService, LoginService],
})
export class AppModule {}
