// import { ValidationPipe } from '@nestjs/common/pipes'; //err
import { ValidationPipe } from '@nestjs/common'; //59ms02ss
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common/pipes'; // ok

async function bootstrap() {
  const port = 3333;
  console.log('Running on port:', port);

  const app = await NestFactory.create(AppModule);

  //1h00ms33ss
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // app.useGlobalPipes(new ValidationPipe()); //59ms02ss
  await app.listen(port);
}
bootstrap();
