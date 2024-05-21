import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('User API')
  .setDescription('API for managing users')
  .setVersion('1.0')
  .addTag('users')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // const storage = multer.memoryStorage(); // Puedes ajustar esto según tus necesidades
  // const upload = multer({ storage });
  // app.use(upload.single('file')); // 'file' es el nombre del campo del formulario donde se enviará el archivo

  await app.listen(process.env.PORTSERVER || 3000);
}

bootstrap();
