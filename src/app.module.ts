import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { DbService } from './db/db.service';
import { LoginController } from './login/login.controller';
import { RegisterController } from './register/register.controller';

@Module({
  imports: [],
  controllers: [AppController, LoginController, RegisterController],
  providers: [AppService, RegisterService, LoginService, DbService],
})
export class AppModule {}
