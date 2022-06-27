import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class ForgotDTO {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  userName: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  id: string;
}

export class verifyOtpDTO {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  otp: string;

  @ApiProperty({
    required: true,
  })
  @Length(4, 64)
  @IsNotEmpty()
  @IsOptional()
  newPassword: string;
}
