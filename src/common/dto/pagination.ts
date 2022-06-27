import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export enum LettersEnum {
  name = 'name',
  B = 'B',
  C = 'C',
}

export class PaginationQuery {
  @ApiProperty({
    minimum: 1,
    maximum: 10000,
    title: 'Page',
    exclusiveMaximum: true,
    exclusiveMinimum: true,
    format: 'int32',
    default: 1,
    required: false,
  })
  @IsOptional()
  page: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  limit: number;

  @ApiProperty({
    enum: LettersEnum,
    enumName: 'sortBy',
    required: false,
  })
  @IsOptional()
  sortBy: LettersEnum;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  search: string;
}
