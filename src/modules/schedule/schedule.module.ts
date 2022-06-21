import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from 'src/entity/pet.entity';
import { Schedule } from 'src/entity/schedule.entity';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Pet])],
  controllers: [ScheduleController],
  providers: [ScheduleService]
})
export class ScheduleModule { }
