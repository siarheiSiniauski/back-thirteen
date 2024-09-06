import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';

import { AppDataSource } from './data-source';
import { AppModule } from './app.module';
import { getConfigCors } from './configs/cors.config';

dotenv.config();

async function bootstrap() {
  await AppDataSource.initialize(); // Инициализация DataSource

  const app = await NestFactory.create(AppModule);

  // Включение CORS с глобальными настройками
  app.enableCors(getConfigCors());

  await app.listen(process.env.PORT || 5001);
}
bootstrap();
