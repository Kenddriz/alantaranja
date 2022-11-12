import {Global, Module} from '@nestjs/common';
import { TopicService } from './topic.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Topic} from "./topic.entity";
import {TopicCreateResolver} from "./resolvers/topic-create-resolver";
import {TopicsPaginateResolver} from "./resolvers/topics-paginate-resolver";
import {TopicUpdateResolver} from "./resolvers/topic-update-resolver";
import {TopicRemoveResolver} from "./resolvers/topic-remove-resolver";
import {TopicUserFieldResolver} from "./resolvers/topic-user-field-resolver";
import {TopicStatisticsFieldResolver} from "./resolvers/topic-statistics-field-resolver";
import {TopicGetResolver} from "./resolvers/topic-get-resolver";
import {PubSub} from "graphql-subscriptions";
import {TopicDocumentFieldResolver} from "./resolvers/topic-document-field-resolver";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Topic])],
  providers: [
    TopicCreateResolver,
    TopicsPaginateResolver,
    TopicUpdateResolver,
    TopicUserFieldResolver,
    TopicDocumentFieldResolver,
    TopicStatisticsFieldResolver,
    TopicGetResolver,
    TopicRemoveResolver,
    TopicService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: [TopicService],
})
export class TopicModule {}
