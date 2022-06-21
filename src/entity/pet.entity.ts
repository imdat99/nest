import { Injectable } from '@nestjs/common';
import {
  Column,
  Entity,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Types } from './type.entity';
import { Specie } from './specie.entity';
import { ESexOfPet } from 'src/config/constant';
import { Customer } from './customer.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  idx: string;

  @Column()
  id: string;

  @ManyToOne(() => Customer, (customer) => customer.pets, {
    eager: true,
    onDelete: 'SET NULL',
  })
  customer: Customer;

  @ManyToOne(() => Specie, (specie) => specie.pets, {
    eager: true,
    onDelete: 'SET NULL',
  })
  specie: Specie;



  @Column({ unique: true })
  name: string;

  @Column()
  avatarUrl: string;

  @Column({
    type: 'enum',
    enum: ESexOfPet,
  })
  sex: ESexOfPet;

  @OneToMany(() => Schedule, (schedule) => schedule.pet, {
    cascade: true,
  })
  schedules: Schedule[];

  addSchedule(schedule?: Schedule) {
    if (this.schedules == null) {
      this.schedules = new Array<Schedule>();
    }
    this.schedules.push(schedule);
  }

  @Column()
  desc: string;
}

@EventSubscriber()
@Injectable()
export class PetSubscriber implements EntitySubscriberInterface<Pet> {
  async afterInsert(event: InsertEvent<Pet>) {
    if (event.metadata.targetName === 'Pet') {
      const repo = event.manager.connection.getRepository(Pet);
      event.entity.id = `P${String(event.entity.idx).padStart(6, '0')}`;
      repo.save(event.entity);
    }
  }
}
