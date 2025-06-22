import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Fórum Vale Tudo API')
    .setDescription('API do Fórum Vale Tudo')
    .setVersion('1.0')
    .addTag('forums', 'Endpoints relacionados aos fóruns')
    .addTag('topics', 'Endpoints relacionados aos tópicos')
    .addTag('posts', 'Endpoints relacionados aos posts')
    .addTag('users', 'Endpoints relacionados aos usuários')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Enable CORS
  app.enableCors();

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());

  
  await app.listen(4000);
}
bootstrap(); 