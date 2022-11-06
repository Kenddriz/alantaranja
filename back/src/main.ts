import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import { publicDir } from './utils';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    require('./app.module').AppModule,
  );
  app.enableCors();
  app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));
  app.useStaticAssets(publicDir());
  app.setGlobalPrefix('api');

  app.listen(3000).then(async () => {
    console.log(`Application is running on: ${await app.getUrl()}`);
  });
}
bootstrap();
