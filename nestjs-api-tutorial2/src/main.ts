// import { ValidationPipe } from '@nestjs/common/pipes'; //way1, err
import { ValidationPipe } from '@nestjs/common'; //way2, xx12
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common/pipes'; //way1, ok

async function bootstrap() {
  const port = 3333;
  console.log('Running on port:', port);

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //1h00ms33ss
    }),
  );

  // app.useGlobalPipes(new ValidationPipe()); //59ms02ss
  await app.listen(port);
}
bootstrap();
