import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ILoginResponse,
  IRefreshAccessTokenResponse,
} from './interface/loginResponse.interface';
import LoginDto from './dto/login.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  loginHandler(@Body() loginDto: LoginDto): Promise<ILoginResponse> {
    return this.authService.login(loginDto);
  }

  @Put('refresh-token')
  refreshTokenHandler(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<IRefreshAccessTokenResponse> {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
