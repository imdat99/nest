import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDTO {
  @ApiProperty()
  readonly access_token: string;
  @ApiProperty()
  readonly refresh_token: string;
}
