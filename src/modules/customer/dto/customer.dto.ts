import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { PaginationQuery } from 'src/common/dto';
import { ESexOfHuman } from 'src/config/constant';

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
  @IsEnum(ESexOfHuman, { each: true })
  sex: ESexOfHuman;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dob: Date;

  @ApiProperty()
  @IsOptional()
  IdNumber: string;

  @ApiProperty()
  @IsOptional()
  avatarUrl: string;

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
