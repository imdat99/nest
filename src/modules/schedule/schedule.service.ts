import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginateResponse } from 'src/common/response';
import response from 'src/common/response/response-func';
import { Pet } from 'src/entity/pet.entity';
import { Schedule } from 'src/entity/schedule.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { getScheduleDTO, ScheduleDTO, updateScheduleDTO } from './dto/schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Pet) private petRepo: Repository<Pet>,
    @InjectRepository(Schedule) private scheduleRepo: Repository<Schedule>,
    @InjectRepository(User) private userRepo: Repository<User>,

  ) { }

  async getSchedule(getScheduleQuery: getScheduleDTO) {
    const take = getScheduleQuery.limit || 999;
    const page = getScheduleQuery.page || 1;
    const skip = (page - 1) * take;
    const keyword = getScheduleQuery.search || '';

    const data = await this.scheduleRepo.findAndCount({
      where: {
        // name: Like('%' + keyword + '%') || getScheduleQuery.date,
        id: getScheduleQuery.id,
        // idUser: getScheduleQuery.idUser
      },
      // order: { name: getScheduleQuery.sortBy ? 'DESC' : 'ASC' },
      take: take,
      skip: skip,
    });
    return paginateResponse(data, page, take);
  }

  async createSchedule(schedule: ScheduleDTO) {
    const pet = await this.petRepo.findOne({
      where: { id: schedule.idPet },
      relations: ['schedules'],
    });

    const user = await this.userRepo.findOne({
      where: { id: schedule.idUser },
      relations: ['schedules'],
    });
    delete schedule.idPet;
    delete schedule.idUser;
    delete user.passWord;
    const newSchedule = await this.scheduleRepo.create(schedule as any);
    pet.addSchedule(newSchedule as any);
    user.addSchedule(newSchedule as any)
    await this.petRepo.save({ ...pet });
    await this.userRepo.save({ ...user });
    return response(200, newSchedule);
  }
  async updateSchedule(dto: updateScheduleDTO, id: string) {
    const property = await this.scheduleRepo.findOneBy({ id });
    const res = await this.scheduleRepo.save({
      ...property, // existing fields
      ...dto, // updated fields
    });
    // delete res?.passWord;
    return response(200, res);
  }
}
