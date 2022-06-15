import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';
import { ROLE } from 'src/config/constant';

export class signUpDTO {
  @ApiProperty()
  @Length(4, 64)
  @IsNotEmpty()
  userName: string;

  @ApiProperty()
  @Length(4, 64)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Length(4, 64)
  @ApiProperty()
  @IsNotEmpty()
  passWord: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ROLE, { each: true })
  role: string;
}
