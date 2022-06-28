import { Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  Column,
  Entity,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pet } from './pet.entity';
import { User } from './user.entity';

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

  @Column()
  symptom: string;

  @ManyToOne(() => Pet, (pet) => pet.schedules, {
    eager: true,
    onDelete: 'SET NULL',
  })
  pet: Pet;

  @ManyToOne(() => User, (user) => user.schedules, {
    eager: true,
    onDelete: 'SET NULL',
  })
  user: User;


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
