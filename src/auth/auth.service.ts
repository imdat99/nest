import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Model } from 'mongoose';
import { JWT_SECRET_ACCESS, JWT_SECRET_REFRESH } from 'src/config/constant';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { LoginDTO, signUpDTO } from './dto';
import { RefreshTokenDocument } from './schema/refreshtoken.schema';
import { rtArr, Tokens } from './type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
    @InjectModel('rtArray') private rtArrayModel: Model<RefreshTokenDocument>,
  ) {}

  async createRtArray(id: string): Promise<rtArr> {
    const createdRtArr = new this.rtArrayModel({
      id,
      refreshTokenArr: [],
    });
    return createdRtArr.save();
  }
  async updateRtArray(id: string, refreshToken: string): Promise<rtArr> {
    return await this.rtArrayModel.findOneAndUpdate(
      { id },
      { $pull: { refreshTokenArr: { $in: [refreshToken] } } },
    );
  }

  async getTokens(id: string, userName: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          userName,
        },
        {
          secret: JWT_SECRET_ACCESS,
          expiresIn: 60 * 60,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          userName,
        },
        {
          secret: JWT_SECRET_REFRESH,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    await this.rtArrayModel.findOneAndUpdate(
      { id },
      { $push: { refreshTokenArr: rt } },
    );
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async signUpFn(dto: signUpDTO) {
    const isExistUser = await this.userRepo.findBy({
      userName: dto.userName,
      email: dto.email,
    });
    if (isExistUser.length) {
      throw new ConflictException('Username of email had been used!');
    }
    const hashedPassword = await argon2?.hash(dto.passWord);
    const newUser = (await this.userRepo.save(
      this.userRepo.create({
        ...dto,
        passWord: hashedPassword,
      } as any),
    )) as any;
    await this.createRtArray(newUser.id as string);
    const tokens = await this.getTokens(
      newUser.id as string,
      newUser.userName as string,
    );
    return tokens;
  }

  async logInFn(loginDTO: LoginDTO) {
    try {
      const isExistUser = await this.userRepo.findOneByOrFail({
        userName: loginDTO.userName,
      });
      if (!isExistUser) {
        throw new HttpException(
          'Incorrect username or password',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (err ) {
      return {
        err.code,
      };
    }
  }

  logOutFn() {
    return 1;
  }

  refreshFn() {
    return 1;
  }
}
