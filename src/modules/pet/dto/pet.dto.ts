import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQuery } from 'src/common/dto';
import { ESexOfPet } from 'src/config/constant';

export class PetDTO {
  @ApiProperty()
  @IsOptional()
  idCustomer: string;

  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(ESexOfPet, { each: true })
  sex: ESexOfPet;

  @ApiProperty()
  @IsOptional()
  idSpecie: string;

  @ApiProperty()
  @IsOptional()
  desc: string;
}
export class PetResponseDTO extends PetDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  idx: string;
}

export class getPetDTO extends PaginationQuery {
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
}
