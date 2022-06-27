import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PaginationQuery } from 'src/common/dto';
import { isChecked } from 'src/config/constant';

export class TypesDTO {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  desc: string;

  @ApiProperty()
  @IsOptional()
  isChecked: isChecked;

}
export class TypesResponseDTO extends TypesDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  idx: string;
}

export class getTypesDTO extends PaginationQuery {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  name: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  id: string;


  @ApiProperty(
    {
      required: false,
    }
  )
  @IsOptional()
  isChecked: isChecked;
}
