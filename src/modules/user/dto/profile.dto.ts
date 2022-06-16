import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import { ROLE } from 'src/config/constant';

export class profileDTO {
  id: string;

  @ApiProperty()
  @IsOptional()
  userName: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  dob: Date;

  @ApiProperty()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  avatarUri: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(ROLE, { each: true })
  role: ROLE;
}
