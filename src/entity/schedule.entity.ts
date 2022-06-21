import { Injectable } from '@nestjs/common';
import { ESexOfHuman } from 'src/config/constant';
import {
  Column,
  Entity,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pet } from './pet.entity';
import { Specie } from './specie.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  idx: string;

  @Column()
  id: string;

  @Column()
  date: Date;

  @Column()
  time: string;

  @ManyToOne(() => Pet, (pet) => pet.schedules, {
    eager: true,
    onDelete: 'SET NULL',
  })
  pet: Pet;

}

@EventSubscriber()
@Injectable()
export class ScheduleSubscriber implements EntitySubscriberInterface<Schedule> {
  async afterInsert(event: InsertEvent<Schedule>) {
    if (event.metadata.targetName === 'Schedule') {
      const repo = event.manager.connection.getRepository(Schedule);
      event.entity.id = `LK${String(event.entity.idx).padStart(6, '0')}`;
      repo.save(event.entity);
    }
  }
}
