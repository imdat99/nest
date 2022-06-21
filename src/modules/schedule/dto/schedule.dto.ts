import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PaginationQuery } from 'src/common/dto';
import { Omit } from 'src/common/tools/helper';

export class ScheduleDTO {
  @ApiProperty()
  @IsOptional()
  date: Date;

  @ApiProperty()
  @IsOptional()
  time: string;

  @ApiProperty()
  @IsOptional()
  idPet: string;

}
export class ScheduleResponseDTO extends Omit(ScheduleDTO, ['idPet']) { }
export class getAllScheduleResponseDTO extends ScheduleDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  idx: string;
}

export class getScheduleDTO extends PaginationQuery {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  date: Date;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  id: string;
}
