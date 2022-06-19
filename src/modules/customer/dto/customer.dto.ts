import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PaginationQuery } from 'src/common/dto';

export class CustomerDTO {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  numberPhone: string;

  @ApiProperty()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsOptional()
  IdNumber: string;

  @ApiProperty()
  @IsOptional()
  address: string;

}
export class CustomerResponseDTO extends CustomerDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  idx: string;



}

export class getCustomerDTO extends PaginationQuery {
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
