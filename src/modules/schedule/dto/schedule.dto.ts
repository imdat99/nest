import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';
import { PaginationQuery } from 'src/common/dto';
import { Omit } from 'src/common/tools/helper';


export class updateScheduleDTO {
  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsOptional()
  time: string;

  @ApiProperty()
  @IsOptional()
  symptom: string;

}
export class ScheduleDTO extends updateScheduleDTO {



  @ApiProperty()
  @IsOptional()
  idPet: string;

  @ApiProperty()
  @IsOptional()
  idUser: string;

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


  @ApiProperty({
    required: false,
  })
  @IsOptional()
  idUser: string;
}
