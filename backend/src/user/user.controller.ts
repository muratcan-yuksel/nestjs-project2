import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  //if you leave @Get() empty, it will default to the path of the controller like so: /users
  //if you write @Get('me') it will be /users/me
  //this route will be guarded by the jwt strategy
  //so, to access this route, I need to get an access token by either signing up or signing in and pass the access token as header in this  request
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
