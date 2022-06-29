import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import { PaginationQuery } from 'src/common/dto';
import { ESexOfHuman, ROLE } from 'src/config/constant';

export class profileDTO {
  @ApiProperty()
  @IsOptional()
  userName: string;

  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  dob: Date;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  avatarUrl: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(ROLE, { each: true })
  role: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(ESexOfHuman, { each: true })
  sex: string;

  @ApiProperty()
  @IsOptional()
  idNumber: string;

  @ApiProperty()
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsOptional()
  experience: string; //kinh nghiem

  @ApiProperty()
  @IsOptional()
  specialization: string; //chuyen mon
}

export class ProfileResponseDTO extends profileDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  idx: string;
}

export class getProfileDTO extends PaginationQuery {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  name: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  id: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  role: ROLE;
}
