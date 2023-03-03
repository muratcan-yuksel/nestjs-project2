import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    //generate the password hash
    const hash = await argon.hash(dto.password);
    //this try catch error handling didn't work at all
    try {
      //save the new user in the db
      const user: User = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      //delete user hash from return statement
      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        //this code means that "you're trying to create a user with an email that already exists"
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
      //if it doesn't come from prisma
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    //find user by email
    //if user does not exist throw error
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    //compare password
    //if password is wrong throw error
    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) {
      throw new ForbiddenException('Invalid credentials');
    }

    //send back the user
    delete user.hash;
    return user;

    return { msg: 'hi' };
  }
}
