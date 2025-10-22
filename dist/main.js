"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Fórum Vale Tudo API')
        .setDescription('API do Fórum Vale Tudo')
        .setVersion('1.0')
        .addTag('forums', 'Endpoints relacionados aos fóruns')
        .addTag('topics', 'Endpoints relacionados aos tópicos')
        .addTag('posts', 'Endpoints relacionados aos posts')
        .addTag('users', 'Endpoints relacionados aos usuários')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    app.enableCors({
        origin: '*',
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map