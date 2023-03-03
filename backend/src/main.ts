import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //we need this to ue the validation pipe
  //whitelist stripes out the elements that are not in the dto
  //by elements I mean what if someone tries to pass a field that doesn't exist in my schema
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
