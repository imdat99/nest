import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class profileDTO {
  id: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  dob: Date;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  avatarUri: string;
}
