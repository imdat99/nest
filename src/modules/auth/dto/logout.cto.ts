import { ApiProperty } from '@nestjs/swagger';

export class LogoutDTO {
  @ApiProperty()
  readonly refresh_token: string;
}
