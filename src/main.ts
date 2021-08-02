import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'aws-sdk';
import { StorageConfig } from '@infrastructure/config/StorageConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  config.update({
    accessKeyId: StorageConfig.AWS_ACCESS_KEY,
    secretAccessKey: StorageConfig.AWS_SECRET_KEY,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
