import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1");

  const config = new DocumentBuilder()
    .setTitle('Coworking Space Reservation API - v1')
    .setDescription(
      'API for managing workspace reservations in a coworking. It facilitates the management of space occupation and improves the user experience.',
    )
    .setVersion('1.0')
    .addTag('Swagger')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  await app.listen(3000);

}
bootstrap();