import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { profileDTO } from './dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async getProfile(id: string) {
    const profile = await this.userRepo.findOneBy({ id });
    delete profile.passWord;
    return profile;
  }

  async updatePrrofile(id: string, profileData: profileDTO) {
    const property = await this.userRepo.findOneBy({ id });
    const res = await this.userRepo.save({
      ...property, // existing fields
      ...profileData, // updated fields
    });
    delete res?.passWord;
    return {
      success: true,
      res,
    };
  }
}
