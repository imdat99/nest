import { Injectable } from '@nestjs/common';
import {
  Column,
  Entity,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Types } from './type.entity';

@Entity()
export class Specie {
  @PrimaryGeneratedColumn()
  idx: string;

  @Column()
  id: string;

  @ManyToOne(() => Types, (type) => type.species, {
    eager: true,
    onDelete: 'SET NULL',
  })
  type: Types;

  @Column({ unique: true })
  name: string;

  @Column()
  desc: string;
}

@EventSubscriber()
@Injectable()
export class Specieubscriber implements EntitySubscriberInterface<Specie> {
  async afterInsert(event: InsertEvent<Specie>) {
    if (event.metadata.targetName === 'Specie') {
      const repo = event.manager.connection.getRepository(Specie);
      event.entity.id = `G${String(event.entity.idx).padStart(6, '0')}`;
      repo.save(event.entity);
    }
  }
}
