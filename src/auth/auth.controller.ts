import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthService } from './auth.service';
import { LoginDTO, LoginResponseDTO, signUpDTO } from './dto';

@ApiBearerAuth()
@Controller('auth/v1')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('')
  getAuth() {
    return {
      msg: 'hello',
    };
  }

  @Post('/signup')
  @ApiOkResponse({ type: LoginResponseDTO })
  async signUpCtrl(@Body() dto: signUpDTO) {
    return await this.authService.signUpFn(dto);
  }

  @Post('/login')
  @ApiOkResponse({ type: LoginResponseDTO })
  async logInCtrl(@Body() loginDTO: LoginDTO) {
    return await this.authService.logInFn(loginDTO);
  }

  @Get('/logout/:id')
  logOutCtrl() {
    this.authService.logOutFn();
  }

  @Post('/refresh')
  refreshCtrl() {
    this.authService.refreshFn();
  }
}
