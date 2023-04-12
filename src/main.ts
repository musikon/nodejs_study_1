import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

async function start() {
  const PORT = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
      .setTitle('Test swagger')
      .setDescription('Test project api')
      .setVersion('1.0.0')
      .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/swagger', app, document)

  await app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
}
start();