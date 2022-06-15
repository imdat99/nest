import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { profileDTO, UpdateProfileRes } from './dto';
import { UserService } from './user.service';

@Controller('user')
@ApiBearerAuth()
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Xem profile' })
  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  @ApiOkResponse({ type: profileDTO })
  async profile(@Req() req) {
    const userId = req.user['id'];
    return await this.userService.getProfile(userId);
  }

  @ApiOperation({ summary: 'Cập nhật profile' })
  @UseGuards(AuthGuard('jwt'))
  @Put('/profile')
  @ApiOkResponse({ type: UpdateProfileRes })
  async updateProfile(@Req() req, @Body() profileData: profileDTO) {
    const userId = req.user['id'];
    return await this.userService.updatePrrofile(userId, profileData);
  }
}
