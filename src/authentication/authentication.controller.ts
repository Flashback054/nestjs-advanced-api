import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthenticationGuard } from './guard/local.guard';
import RequestWithUser from './interface/requestWithUser.interface';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import JwtAuthenticationGuard from './guard/jwt.guard';

@Controller('authentication')
class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user } = req;
    user.password = undefined;

    const jwt = this.authenticationService.getJwtToken(user.id);
    res.cookie('Authentication', jwt, {
      httpOnly: true,
      maxAge: this.configService.get('JWT_EXPIRATION_TIME'),
    });

    return user;
  }

  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('Authentication', {
      httpOnly: true,
      maxAge: this.configService.get('JWT_EXPIRATION_TIME'),
    });
    return;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() req: RequestWithUser) {
    const user = req.user;
    user.password = undefined;
    return user;
  }
}

export default AuthenticationController;
