import { ApiProperty } from '@nestjs/swagger';
import { profileDTO } from './profile.dto';

export class UpdateProfileRes {
  @ApiProperty()
  success: true;

  @ApiProperty({ type: () => profileDTO })
  data: profileDTO;
}
