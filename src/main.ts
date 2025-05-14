import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const log = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  const port = configService.get<string>('api.port') || 3000;
  await app.listen(port);
  log.log(`Server started on port ${port}`);
}
bootstrap();
