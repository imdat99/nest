import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class passWordDTO {
  @ApiProperty()
  @Length(4, 64)
  @IsNotEmpty()
  readonly newPass: string;

  @Length(4, 64)
  @ApiProperty()
  @IsNotEmpty()
  readonly oldWord: string;
}
