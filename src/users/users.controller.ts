import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LoginUserDTO, RegisterUserDTO } from 'src/models/user.dtos';
import { ApiResponce } from 'src/utils/responce';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/register')
  async registerUser(
    @Body() data: RegisterUserDTO,
  ): Promise<ApiResponce<undefined>> {
    console.log(data);
    await this.userService.registerUser(data);
    return ApiResponce.createSuccess(undefined);
  }

  @Post('/login')
  async loginUser(
    @Body() data: LoginUserDTO,
  ): Promise<ApiResponce<{ username: string; id: string; jwt: string }>> {
    const res = await this.userService.loginUser(data);
    if (!res) {
      return ApiResponce.createError('Unknown error');
    }
    return ApiResponce.createSuccess({
      username: res.user.username,
      id: res.user.id,
      jwt: res.jwt,
    });
  }

  @Post('/login-jwt')
  async loginUserByJWT(
    @Body() data: { jwt: string },
  ): Promise<ApiResponce<{ username: string; id: string }>> {
    const res = await this.userService.checkJWT(data.jwt);
    return ApiResponce.createSuccess({
      username: res.username,
      id: res.id,
    });
  }

  @Get('/check-jwt')
  async checkJWT(@Query('jwt') jwt: string): Promise<ApiResponce<boolean>> {
    await this.userService.checkJWT(jwt);
    return ApiResponce.createSuccess(true);
  }
}
