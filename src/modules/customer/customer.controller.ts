import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CustomerDTO, CustomerResponseDTO, getCustomerDTO } from './dto/customer.dto';

@Controller('customer')
@ApiBearerAuth()
@ApiTags('Khách hàng')
export class CustomerController {

  constructor(private customerService: CustomerService) { }

  @ApiOperation({ summary: 'Lấy toàn bộ danh sách khách hàng' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CustomerResponseDTO, isArray: true })
  @Get('/')
  async getAllCustomer(@Query() getQuery: getCustomerDTO) {
    return await this.customerService.getCustomer(getQuery);
  }
  @ApiOperation({ summary: 'Tạo Khách Hàng' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CustomerResponseDTO })
  @Post('')
  async registerCustomer(@Body() customerDTO: CustomerDTO) {
    console.log(customerDTO);

    return await this.customerService.registerCustomer(customerDTO);
  }

  // @ApiOperation({ summary: 'Cập Nhật Loài' })
  // @UseGuards(AuthGuard('jwt'))
  // @ApiOkResponse({ type: TypesResponseDTO })
  // @Put('/:id')
  // async updateTypes(@Body() typesDTO: TypesDTO, @Param('id') id: string) {
  //   return await this.typesService.updateType(typesDTO, id);
  // }

  // @ApiOperation({ summary: 'Xóa Loài' })
  // @UseGuards(AuthGuard('jwt'))
  // @Delete('/:id')
  // async deleteTypes(@Param('id') id: string) {
  //   return await this.typesService.deleteType(id);
  // }

}
