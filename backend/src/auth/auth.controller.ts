import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
@Controller('auth')
export class AuthController {
  constructor(
    // private readonly authService: AuthService,
    private authService: AuthService,
  ) {
    // this.authService.test();
  }
  @Post('signup')
  //dto= data transfer object
  signup(@Body() dto: AuthDto) {
    console.log({
      dto,
    });
    return this.authService.signup(dto);
  }
  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
