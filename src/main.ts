import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import  { json, urlencoded } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const host = process.env.API_HOST;
  const port = process.env.API_PORT || 3000;

  app.use(json({ limit: '450mb' }));
  app.use(urlencoded({ extended: true, limit: '450mb' }));

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  const config  = new DocumentBuilder()
  .setTitle("Back-end - RPG")
  .setDescription("API para RPG de Mesa")
  .setVersion("0.0.2")
  .addTag("rpg")
  .build()
  const document = SwaggerModule.createDocument(app, config)
  
  SwaggerModule.setup('/', app, document)

  await app.listen(port, host, () => {
    console.log(`Servindo em : ${host}: ${port}`);
  });
}
bootstrap();
