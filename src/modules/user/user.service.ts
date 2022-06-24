import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { elementAt } from 'rxjs';
import response, { paginateResponse } from 'src/common/response/response-func';
import { User } from 'src/entity/user.entity';
import { Like, Repository } from 'typeorm';
import { getProfileDTO, profileDTO } from './dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

  async getProfile(id: string) {
    const profile = await this.userRepo.findOneBy({ id });
    delete profile.passWord;
    return response(200, profile);
  }

  async getAllUser(getQuery?: getProfileDTO) {
    const take = getQuery.limit || 999;
    const page = getQuery.page || 1;
    const skip = (page - 1) * take;
    const keyword = getQuery.search || '';

    const data = await this.userRepo.findAndCount({
      where: {
        name: Like('%' + keyword + '%') || getQuery.name,
        id: getQuery.id,
      },
      order: { name: getQuery.sortBy ? 'DESC' : 'ASC' },
      take: take,
      skip: skip,
    });
    data[0].map((el) => {
      delete el.passWord
    })


    return paginateResponse(data, page, take);
  }


  // async updateProfile(id: string, profileData: profileDTO) {
  //   const property = await this.userRepo.findOneBy({ id });
  //   const res = await this.userRepo.save({
  //     ...property, // existing fields
  //     ...profileData, // updated fields
  //   });
  //   return response(200, res);
  // }
}
