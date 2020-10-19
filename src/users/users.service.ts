import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { LoginUserDTO, RegisterUserDTO } from 'src/models/user.dtos';
import { User, UserDocument } from 'src/models/user.schema';
import { ServerError } from 'src/utils/error';
import { sign, TokenExpiredError, verify } from 'jsonwebtoken';

export class UserNotFoundError extends ServerError {
  static create(code: string) {
    return new UserNotFoundError('User not found', HttpStatus.NOT_FOUND, code);
  }
}

export class InvalidJWTError extends ServerError {
  static create(code: string) {
    return new InvalidJWTError('Jwt is invalid', HttpStatus.BAD_REQUEST, code);
  }
}

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async registerUser(data: RegisterUserDTO): Promise<UserDocument> {
    const user = new this.userModel(data);
    return user.save();
  }

  async loginUser(
    data: LoginUserDTO,
  ): Promise<{ user: UserDocument; jwt: string }> {
    const user = await this.userModel
      .findOne({
        ...data,
      })
      .exec();

    if (!user) throw UserNotFoundError.create('0x0001');

    const jwt = sign(
      {
        username: user.username,
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24,
      },
    );

    return {
      user,
      jwt,
    };
  }

  async checkJWT(jwt: string): Promise<UserDocument> {
    try {
      const decoded = await verify(jwt, process.env.JWT_SECRET);
      if (!decoded['username']) throw InvalidJWTError.create('0x0003');
      if (!decoded['id']) throw InvalidJWTError.create('0x0004');

      const user = await this.userModel.findById(decoded['id']).exec();
      if (user.username !== decoded['username'])
        throw InvalidJWTError.create('0x0005');

      return user;
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw InvalidJWTError.create('0x0006');
      }
      throw ServerError.create('0x0002');
    }
  }
}
