import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class LoginDTO {
  @ApiProperty()
  @Length(4, 64)
  @IsNotEmpty()
  userName: string;

  @Length(4, 64)
  @ApiProperty()
  @IsNotEmpty()
  readonly passWord: string;
}
