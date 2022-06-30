import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/entity/customer.entity';
import { Pet } from 'src/entity/pet.entity';
import { Schedule } from 'src/entity/schedule.entity';
import { Specie } from 'src/entity/specie.entity';
import { Types } from 'src/entity/type.entity';
import { User } from 'src/entity/user.entity';
import { AtStrategy } from '../auth/strategies';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Customer, Types, Schedule, Specie, Pet])],
  controllers: [UserController],
  providers: [UserService, AtStrategy],
})
export class UserModule { }
