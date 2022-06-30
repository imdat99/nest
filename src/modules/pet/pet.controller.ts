import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Pet } from 'src/entity/pet.entity';
import { getPetDTO, PetDTO, PetResponseDTO } from './dto/pet.dto';
import { PetService } from './pet.service';


@ApiBearerAuth()
@ApiTags('Thú cưng')
@Controller('pet')
export class PetController {
  constructor(private petService: PetService) { }

  @ApiOperation({ summary: 'Lấy toàn bộ danh sách thú' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: PetResponseDTO, isArray: true })
  @Get('/')
  async getAllPet(@Query() getQuery: getPetDTO) {

    return await this.petService.getPet(getQuery);
  }
  @ApiOperation({ summary: 'Tạo Thú' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: PetResponseDTO })
  @Post('')
  async registerPet(@Body() petDTO: PetDTO) {
    return await this.petService.createPet(petDTO);
  }
  @ApiOperation({ summary: 'Cập Nhật Thú' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: Pet })
  @Put('/:id')
  async updateSpecie(@Body() Pet: PetDTO, @Param('id') id: string) {
    return await this.petService.updatePet(Pet, id);
  }

  @ApiOperation({ summary: 'Xóa Thú' })
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteTypes(@Param('id') id: string) {
    return await this.petService.deletePet(id);
  }

}
