import { APP } from './common/constants/app.constant';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParcer from 'cookie-parser';
import { HttpExceptionFilter } from './common/filters/http-exceptions.filter';
import { requestLogger } from './common/middlewares/request-logger.middleware';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      colors: false,
    }),
  });
  const configService = app.get(ConfigService);
  if (configService.get<string>('NODE_ENV') !== 'production') {
    app.use(requestLogger);
  }
  app.use(cookieParcer());
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Waterly')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  const port = configService.get<number>('PORT') ?? APP.DEFAULT_PORT;
  app.enableCors({
    origin: APP.CORS_ORIGINS,
    methods: APP.CORS_METHODS,
    credentials: true,
  });
  await app.listen(port);
  console.log(`App is running on http://localhost:${port}/api`);
  console.log(`Swagger docs at http://localhost:${port}/api/docs`);
}

bootstrap();
