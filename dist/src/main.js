"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const fs_1 = require("fs");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('VintAlert API')
        .setDescription('API to get the best business')
        .setVersion('1.0')
        .addServer('/')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(3000);
    if (process.env.NODE_ENV === 'development') {
        const pathToSwaggerStaticFolder = (0, path_1.resolve)(process.cwd(), 'swagger-static');
        const pathToSwaggerJson = (0, path_1.resolve)(pathToSwaggerStaticFolder, 'swagger.json');
        const swaggerJson = JSON.stringify(document, null, 2);
        (0, fs_1.writeFileSync)(pathToSwaggerJson, swaggerJson);
        console.log(`Swagger JSON file written to: '/swagger-static/swagger.json'`);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map