import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { PaginationQuery } from 'src/common/dto';
import { Omit } from 'src/common/tools/helper';
import { isChecked } from 'src/config/constant';
import { TypesResponseDTO } from 'src/modules/types/dto/types.dto';

export class SpecieDTO {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  idType: string;

  @ApiProperty()
  @IsOptional()
  desc: string;

  @ApiProperty()
  @IsOptional()
  isChecked: isChecked;
}

export class SpecieResponseDTO extends Omit(SpecieDTO, ['idType']) { }
export class GetAllSpecieResponseDTO extends SpecieResponseDTO {
  @ApiProperty({ type: () => TypesResponseDTO })
  type: TypesResponseDTO;
}

export class getSpeciesDTO extends PaginationQuery {
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

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  isChecked: isChecked;

}
