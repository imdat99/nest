import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class signUpDTO {
  @ApiProperty()
  @Length(4, 64)
  @IsNotEmpty()
  userName: string;

  @ApiProperty()
  @Length(4, 64)
  @IsNotEmpty()
  email: string;

  @Length(4, 64)
  @ApiProperty()
  @IsNotEmpty()
  passWord: string;
}
