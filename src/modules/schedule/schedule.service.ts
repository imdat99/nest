import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginateResponse } from 'src/common/response';
import response from 'src/common/response/response-func';
import { Pet } from 'src/entity/pet.entity';
import { Schedule } from 'src/entity/schedule.entity';
import { Repository } from 'typeorm';
import { getScheduleDTO, ScheduleDTO } from './dto/schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Pet) private petRepo: Repository<Pet>,
    @InjectRepository(Schedule) private scheduleRepo: Repository<Schedule>,
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
    delete schedule.idPet;
    const newSchedule = await this.petRepo.create(schedule as any);
    pet.addSchedule(newSchedule as any);
    await this.petRepo.save({ ...pet });
    return response(200, newSchedule);
  }
}
