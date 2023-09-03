import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  //this exports the prisma service which can then be used in auth serviice
  exports: [PrismaService]
})
export class PrismaModule {}
