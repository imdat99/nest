import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class TypesDTO {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  desc: string;





}