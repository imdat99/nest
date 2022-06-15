import {
  Body,
  Controller,
  Get,
  Post,
  Put,
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
import { sucessResponseDTO } from 'src/common/dto';
import { AuthService } from './auth.service';
import {
  LoginDTO,
  LoginResponseDTO,
  passWordDTO,
  signUpDTO,
  LogoutDTO,
} from './dto';

@ApiBearerAuth()
@Controller('auth/v1')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Tạo tài khoản mới' })
  @Post('/signup')
  @ApiOkResponse({ type: LoginResponseDTO })
  async signUpCtrl(@Body() dto: signUpDTO) {
    return await this.authService.signUpFn(dto);
  }

  @ApiOperation({ summary: 'Đăng nhập' })
  @Post('/login')
  @ApiOkResponse({ type: LoginResponseDTO })
  async logInCtrl(@Body() loginDTO: LoginDTO) {
    return await this.authService.logInFn(loginDTO);
  }

  @ApiOperation({ summary: 'Đăng xuất' })
  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  @ApiOkResponse({ type: LoginResponseDTO })
  async logOutCtrl(@Req() req, @Body() logoutDTO: LogoutDTO) {
    const userId = req.user['id'];
    return await this.authService.logOutFn(userId, logoutDTO);
  }

  @ApiOperation({ summary: 'Refresh token' })
  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('/refresh')
  @ApiOkResponse({ type: LoginResponseDTO })
  async refreshCtrl(@Req() req) {
    const userId = req.user['id'];
    const userName = req.user['userName'];
    const refresh_token = req.user['refresh_token'];
    return await this.authService.refreshFn(userId, refresh_token, userName);
  }

  @ApiOperation({ summary: 'Đổi mật khẩu' })
  @UseGuards(AuthGuard('jwt'))
  @Put('/changepassword')
  @ApiOkResponse({ type: sucessResponseDTO })
  async changePassWord(@Req() req, @Body() passDto: passWordDTO) {
    const userId = req.user['id'];
    return await this.authService.chagePasss(userId, passDto);
  }
}
