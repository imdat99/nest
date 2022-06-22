import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { PaginationQuery } from 'src/common/dto';
import { ESexOfPet } from 'src/config/constant';

export class PetDTO {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  avatarUrl: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(ESexOfPet, { each: true })
  sex: ESexOfPet;

  @ApiProperty()
  @IsOptional()
  desc: string;

  @ApiProperty()
  @IsOptional()
  idSpecie: string;

  @ApiProperty()
  @IsOptional()
  idCustomer: string;

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
