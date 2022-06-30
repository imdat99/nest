import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { getAllScheduleResponseDTO, getScheduleDTO, ScheduleDTO, ScheduleResponseDTO, updateScheduleDTO } from './dto/schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
@ApiBearerAuth()
@ApiTags('Lịch Khám')
export class ScheduleController {

  constructor(private scheduleService: ScheduleService) { }

  @ApiOperation({ summary: 'Lấy ds lịch khám' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: getAllScheduleResponseDTO })
  @Get('')
  async getAllTypes(@Query() getScheduleQuery: getScheduleDTO) {
    return await this.scheduleService.getSchedule(getScheduleQuery);
  }

  @ApiOperation({ summary: 'Tạo lịch khám' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: ScheduleResponseDTO })
  @Post('')
  async createSpecie(@Body() Schedule: ScheduleDTO) {
    return await this.scheduleService.createSchedule(Schedule)
  }

  @ApiOperation({ summary: 'Cập Nhật Lịch Khám' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: ScheduleResponseDTO })
  @Put('/:id')
  async updateTypes(@Body() updateScheduleDTO: updateScheduleDTO, @Param('id') id: string) {
    return await this.scheduleService.updateSchedule(updateScheduleDTO, id);
  }

  @ApiOperation({ summary: 'Xóa Lịch khám' })
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteTypes(@Param('id') id: string) {
    return await this.scheduleService.deleteSchedule(id);
  }

  @ApiOperation({ summary: 'Tổng Quan Trạng Thái Lịch Khám' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse()
  @Get('overview/status')
  async overviewStatus() {
    return await this.scheduleService.overviewStatus()
  }

}
