import { Injectable } from '@nestjs/common';
import {
  Column,
  Entity,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Types {
  @PrimaryGeneratedColumn()
  idx: string;

  @Column()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  desc: string;





}

@EventSubscriber()
@Injectable()
export class TypeSubscriber implements EntitySubscriberInterface<Types> {
  async afterInsert(event: InsertEvent<Types>) {
    const repo = event.manager.connection.getRepository(Types);
    event.entity.id = `L${String(event.entity.idx).padStart(6, '0')}`;
    repo.save(event.entity);
  }
}
