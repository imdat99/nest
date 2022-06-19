import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { getPetDTO, PetDTO, PetResponseDTO } from './dto/pet.dto';
import { PetService } from './pet.service';


@ApiBearerAuth()
@ApiTags('Thú cưng')
@Controller('pet')
export class PetController {
  constructor(private customerService: PetService) { }

  @ApiOperation({ summary: 'Lấy toàn bộ danh sách thú' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: PetResponseDTO, isArray: true })
  @Get('/')
  async getAllCustomer(@Query() getQuery: getPetDTO) {
    return await this.customerService.getPet(getQuery);
  }
  @ApiOperation({ summary: 'Tạo Thú' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: PetResponseDTO })
  @Post('')
  async registerCustomer(@Body() petDTO: PetDTO) {
    return await this.customerService.createPet(petDTO);
  }

}
