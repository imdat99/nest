import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Model } from 'mongoose';
import { MSG } from 'src/config/constant';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { LoginDTO, LogoutDTO, passWordDTO, signUpDTO } from './dto';
import { RefreshTokenDocument } from './schema/refreshtoken.schema';
import { rtArr, Tokens } from './type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
    @InjectModel('rtArray') private rtArrayModel: Model<RefreshTokenDocument>,
    private config: ConfigService,
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

  async getTokens(
    id: string,
    userName: string,
  ): Promise<Tokens & { success: boolean }> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id,
          userName,
        },
        {
          secret: this.config.get<string>('ACCESTOKEN_TOKEN_SECRET'),
          expiresIn: 60 * 60,
        },
      ),
      this.jwtService.signAsync(
        {
          id,
          userName,
        },
        {
          secret: this.config.get<string>('REFRESHTOKEN_TOKEN_SECRET'),
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    await this.rtArrayModel.findOneAndUpdate(
      { id },
      { $push: { refreshTokenArr: rt } },
    );
    return {
      success: true,
      access_token: at,
      refresh_token: rt,
    };
  }

  async signUpFn(dto: signUpDTO) {
    try {
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
      return { status: 200, ...tokens };
    } catch (err) {
      console.log(err);
      throw new ConflictException(
        `${MSG.FRONTEND.EMAIL_DUPLICATED} or ${MSG.FRONTEND.USERNAME_DUPLICATED}`,
      );
    }
  }

  async logInFn(loginDTO: LoginDTO) {
    try {
      const isExistUser = await this.userRepo.findOneByOrFail({
        userName: loginDTO.userName,
      });
      const passwordValid = await argon2.verify(
        isExistUser.passWord,
        loginDTO.passWord,
      );
      if (!passwordValid) {
        return new HttpException(
          MSG.FRONTEND.AUTH_FAILED_WRONG_PASSWORD,
          HttpStatus.NOT_FOUND,
        );
      }
      const tokens = await this.getTokens(
        isExistUser.id as string,
        isExistUser.userName as string,
      );
      delete isExistUser.passWord;
      return { status: 200, ...tokens, user: isExistUser };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        MSG.FRONTEND.USERNAME_NOT_EXIST,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async logOutFn(id: string, logoutDTO: LogoutDTO) {
    try {
      const isTrueToken = await this.rtArrayModel.findOne({ id });
      if (isTrueToken.refreshTokenArr?.includes(logoutDTO.refresh_token)) {
        await this.rtArrayModel.findOneAndUpdate(
          { id },
          { $pull: { refreshTokenArr: { $in: [logoutDTO.refresh_token] } } },
        );
        return {
          status: 200,
          success: true,
          access_token: '',
          refresh_token: '',
        };
      } else {
        return new HttpException(
          MSG.RESPONSE.BAD_REQUEST,
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async refreshFn(id: string, refresh_token: string, userName: string) {
    try {
      const isTrueToken = await this.rtArrayModel.findOne({ id });
      if (isTrueToken.refreshTokenArr?.includes(refresh_token)) {
        await this.rtArrayModel.findOneAndUpdate(
          { id },
          { $pull: { refreshTokenArr: { $in: [refresh_token] } } },
        );
        const tokens = await this.getTokens(id, userName);
        return { status: 200, ...tokens };
      } else {
        return new HttpException(
          MSG.RESPONSE.BAD_REQUEST,
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async chagePasss(id: string, passDTO: passWordDTO) {
    if (passDTO.newPass === passDTO.oldWord) {
      return new HttpException(
        MSG.FRONTEND.DOUPLICATE_PASSWORD,
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    const property = await this.userRepo.findOneBy({ id });
    const passwordValid = await argon2.verify(
      property.passWord,
      passDTO.oldWord,
    );
    if (!passwordValid) {
      return new HttpException(
        MSG.FRONTEND.WRONG_PASSWORD,
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    const hashedPassword = await argon2.hash(passDTO.newPass);
    await this.userRepo.save({
      ...property, // existing fields
      passWord: hashedPassword, // updated fields
    });

    return {
      status: 200,
      success: true,
      message: MSG.RESPONSE.SUCCESS,
    };
  }
}
