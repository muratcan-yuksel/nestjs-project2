import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
//adding this Global decorator will make the PrismaService available to all modules
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
