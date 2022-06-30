import { Body, Controller, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { getProfileDTO, profileDTO, ProfileResponseDTO, UpdateProfileRes } from './dto';
import { UserService } from './user.service';

@Controller('user')
@ApiBearerAuth()
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) { }

  @ApiOperation({ summary: 'Xem profile' })
  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  @ApiOkResponse({ type: profileDTO })
  async profile(@Req() req) {
    const userId = req.user['id'];
    return await this.userService.getProfile(userId);
  }

  // @ApiOperation({ summary: 'Cập nhật profile' })
  // @UseGuards(AuthGuard('jwt'))
  // @Put('/profile')
  // @ApiOkResponse({ type: UpdateProfileRes })
  // async updateProfile(@Req() req, @Body() profileData: profileDTO) {
  //   const userId = req.user['id'];
  //   return await this.userService.updateProfile(userId, profileData);
  // }

  @ApiOperation({ summary: 'Lấy danh sách nhân viên, bác sĩ' })
  @UseGuards(AuthGuard('jwt'))
  @Get('')
  @ApiOkResponse({ type: ProfileResponseDTO })
  async registerUser(@Query() getQuery: getProfileDTO) {
    return await this.userService.getAllUser(getQuery);

  }


  @ApiOperation({ summary: 'Lấy tổng số lượng các thành phần' })
  @UseGuards(AuthGuard('jwt'))
  @Get('/summary')
  @ApiOkResponse()
  async summary() {
    return await this.userService.summaryBranch();

  }

}
