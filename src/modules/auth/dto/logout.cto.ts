import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';

export class LogoutDTO {
  @ApiProperty()
  @IsEmpty()
  readonly refresh_token: string;
}
