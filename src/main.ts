import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 3333;
  console.log('Running on port:', port);
  const app = await NestFactory.create(AppModule);
  await app.listen(port); //12ms10ss
  // await app.listen(3000);
}
bootstrap();
