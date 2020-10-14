import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/repositories/user.repo';
import { InternalServerError, ServerError } from 'src/utils/error';
import { Repository } from 'typeorm';

export class UserAlreadyExistsError extends ServerError {
  static create(errCode: string) {
    return new UserAlreadyExistsError(
      'User already exists',
      HttpStatus.BAD_REQUEST,
      errCode,
    );
  }
}

@Injectable()
export class RegisterService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createNewUser(username: string, password: string): Promise<User> {
    try {
      const user = new User();
      user.username = username;
      //@todo encrypt password
      user.password = password;

      await this.userRepo.save(user);
      return user;
    } catch (e) {
      if ((e.code = 1231)) {
        throw UserAlreadyExistsError.create('0x0001');
      }
      throw InternalServerError.create(
        'Error during registering a new user',
        '0x0002',
      );
    }
  }
}
