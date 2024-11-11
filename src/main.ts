import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as firebaseAdmin from 'firebase-admin';
import * as fs from 'fs';
//firebase ;
/*const firebaseKeyFilePath = join(__dirname, '..', 'vintedalert-ff3a6-firebase-adminsdk-dg7xi-ef79cb7394.json');

console.log(firebaseKeyFilePath);
const firebaseServiceAccount  = JSON.parse(
fs.readFileSync(firebaseKeyFilePath).toString(),
);
if (firebaseAdmin.apps.length === 0) {
console.log('Initialize Firebase Application.');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
});
}
*/
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('My api')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
