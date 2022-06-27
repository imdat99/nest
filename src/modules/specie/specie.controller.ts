import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Specie } from 'src/entity/specie.entity';
import {
  GetAllSpecieResponseDTO,
  getSpeciesDTO,
  SpecieDTO,
  SpecieResponseDTO,
} from './dto/specie.dto';
import { SpecieService } from './specie.service';

@ApiBearerAuth()
@Controller('specie')
@ApiTags('Giống')
export class SpecieController {
  constructor(private specieService: SpecieService) {}

  @ApiOperation({ summary: 'Lấy ds giống' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: GetAllSpecieResponseDTO })
  @Get('')
  async getAllTypes(@Query() getSpeciesQuery: getSpeciesDTO) {
    return await this.specieService.getSpecie(getSpeciesQuery);
  }
  @ApiOperation({ summary: 'Tạo giống' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: SpecieResponseDTO })
  @Post('')
  async createSpecie(@Body() Specie: SpecieDTO) {
    return await this.specieService.createSpecie(Specie);
  }

  @ApiOperation({ summary: 'Cập Nhật giống' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: Specie })
  @Put('/:id')
  async updateSpecie(@Body() Specie: SpecieDTO, @Param('id') id: string) {
    return await this.specieService.updateSpecie(Specie, id);
  }

  @ApiOperation({ summary: 'Xóa giống' })
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteSpecie(@Param('id') id: string) {
    return await this.specieService.deleteSpecie(id);
  }
}
