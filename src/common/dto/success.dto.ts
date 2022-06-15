import { ApiProperty } from '@nestjs/swagger';

export class sucessResponseDTO {
  @ApiProperty()
  readonly success: boolean;
  @ApiProperty()
  readonly message: string;
}
