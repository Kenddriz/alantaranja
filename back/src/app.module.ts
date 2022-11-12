import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { connexionOptions } from './configuration/connexionLoader';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import {ScheduleModule} from "@nestjs/schedule";
import { CategoryModule } from './category/category.module';
import { DocumentModule } from './document/document.module';
import { PaymentModule } from './payment/payment.module';
import { FamilyModule } from './family/family.module';
import { PaymentDocumentModule } from './payment-document/payment-document.module';
import { TopicModule } from './topic/topic.module';
import { MessageModule } from './message/message.module';
import { ReactionModule } from './reaction/reaction.module';
import {ServeStaticModule} from "@nestjs/serve-static";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(connexionOptions()),
    GraphQLModule.forRoot({
      debug: process.env.NODE_ENV === 'development',
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
      playground: process.env.NODE_ENV === 'development',
      installSubscriptionHandlers: true,
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
      uploads: false,
      introspection: true,
    }),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    EventEmitterModule.forRoot(),
    CategoryModule,
    DocumentModule,
    PaymentModule,
    FamilyModule,
    PaymentDocumentModule,
    TopicModule,
    MessageModule,
    ReactionModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/alantaranjaclient'),
      exclude: ['/api*']
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
