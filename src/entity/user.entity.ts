import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userName: string;

  @Column()
  passWord: string;

  @Column()
  name: string;

  @Column()
  dob: Date;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  avatarUri: string;

  comparePassword: (password: string) => Promise<boolean>;
  compareResetPasswordToken: (password: string) => Promise<boolean>;
}
