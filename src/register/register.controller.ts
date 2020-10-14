import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async registerUser(@Body() userDTO: { username: string; password: string }) {
    const res = await this.registerService.createNewUser(
      userDTO.username,
      userDTO.password,
    );
    return res;
  }
}
