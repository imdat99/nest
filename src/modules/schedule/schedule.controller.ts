import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { getAllScheduleResponseDTO, getScheduleDTO, ScheduleDTO, ScheduleResponseDTO } from './dto/schedule.dto';
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

}
