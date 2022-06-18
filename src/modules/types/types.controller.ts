import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TypesDTO } from './dto/types.dto';
import { TypesService } from './types.service';

@Controller('types')
@ApiTags('Types')
@ApiBearerAuth()

export class TypesController {
  constructor(private typesService: TypesService) { }

  @ApiOperation({ summary: 'Lấy toàn bộ ds Loài' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: TypesDTO })
  @Get('')
  async getAllTypes() {
    return await this.typesService.getType();
  }
  @ApiOperation({ summary: 'Tạo Loài' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: TypesDTO })
  @Post('')
  async registerTypes(@Body() typesDTO: TypesDTO) {
    return await this.typesService.registerType(typesDTO);
  }

  @ApiOperation({ summary: 'Cập Nhật Loài' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: TypesDTO })
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
