import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LogoutDTO {
  @ApiProperty()
  @IsNotEmpty()
  readonly refresh_token: string;
}
