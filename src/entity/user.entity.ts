import { Injectable } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { ROLE } from 'src/config/constant';
import {
  Column,
  Entity,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idx: string;

  @Column()
  id: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  @Exclude()
  passWord: string;

  @Column()
  name: string;

  @Column()
  dob: Date;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  avatarUri: string;

  @Column({
    type: 'enum',
    enum: ROLE,
  })
  role: ROLE;

  comparePassword: (password: string) => Promise<boolean>;
  compareResetPasswordToken: (password: string) => Promise<boolean>;
}

@EventSubscriber()
@Injectable()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  async afterInsert(event: InsertEvent<User>) {
    if (event.metadata.targetName === 'User') {
      const repo = event.manager.connection.getRepository(User);
      event.entity.id = `NV${String(event.entity.idx).padStart(6, '0')}`;
      repo.save(event.entity);
    }
  }
}
