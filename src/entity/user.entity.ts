import { Exclude } from 'class-transformer';
import { ROLE } from 'src/config/constant';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
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
