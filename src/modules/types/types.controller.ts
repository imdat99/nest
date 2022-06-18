import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { getTypesDTO, TypesDTO, TypesResponseDTO } from './dto/types.dto';
import { TypesService } from './types.service';

@Controller('types')
@ApiTags('Types')
@ApiBearerAuth()
export class TypesController {
  constructor(private typesService: TypesService) {}

  @ApiOperation({ summary: 'Lấy toàn bộ ds Loài' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: TypesResponseDTO, isArray: true })
  @Get('/')
  async getAllTypes(@Query() getQuery: getTypesDTO) {
    return await this.typesService.getType(getQuery);
  }
  @ApiOperation({ summary: 'Tạo Loài' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: TypesResponseDTO })
  @Post('')
  async registerTypes(@Body() typesDTO: TypesDTO) {
    return await this.typesService.registerType(typesDTO);
  }

  @ApiOperation({ summary: 'Cập Nhật Loài' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: TypesResponseDTO })
  @Put('/:id')
  async updateTypes(@Body() typesDTO: TypesDTO, @Param('id') id: string) {
    return await this.typesService.updateType(typesDTO, id);
  }

  @ApiOperation({ summary: 'Xóa Loài' })
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteTypes(@Param('id') id: string) {
    return await this.typesService.deleteType(id);
  }
}
