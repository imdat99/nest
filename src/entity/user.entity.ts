import { Injectable } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { ROLE } from 'src/config/constant';
import {
  Column,
  Entity,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idx: string;

  @Column()
  id: string;

  @Column({ unique: true, length: 150 })
  userName: string;

  @Column()
  @Exclude()
  passWord: string;

  @Column()
  name: string;

  @Column()
  dob: Date;

  @Column({ unique: true, length: 150 })
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  avatarUrl: string;

  @Column()
  sex: string;

  @Column()
  idNumber: string;

  @Column()
  address: string;

  @Column({
    type: 'enum',
    enum: ROLE,
  })
  role: ROLE;

  @OneToMany(() => Schedule, (schedule) => schedule.user, {
    cascade: true,
  })
  schedules: Schedule[];

  addSchedule(schedule?: Schedule) {
    if (this.schedules == null) {
      this.schedules = new Array<Schedule>();
    }
    this.schedules.push(schedule);
  }

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
