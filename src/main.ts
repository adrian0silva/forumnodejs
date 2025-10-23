import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

let app: any;

async function bootstrap() {
  if (!app) {
    console.log('DB_HOST env:', process.env.DB_HOST);
    console.log('DATABASE_URL host:', process.env.DATABASE_URL);

    app = await NestFactory.create(AppModule);
    console.log('DB_HOST env:', process.env.DB_HOST);
    console.log('DATABASE_URL host:', process.env.DATABASE_URL);
    
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
    app.enableCors({
      origin: '*',
    });

    // Enable validation
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  }
  return app;
}

// Para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then(() => {
    app.listen(3001);
  });
}

// Para Vercel serverless
export default bootstrap; 