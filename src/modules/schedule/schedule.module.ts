import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from 'src/entity/pet.entity';
import { Schedule } from 'src/entity/schedule.entity';
import { User } from 'src/entity/user.entity';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Pet, User])],
  controllers: [ScheduleController],
  providers: [ScheduleService]
})
export class ScheduleModule { }
