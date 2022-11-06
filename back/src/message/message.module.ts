import {Global, Module} from '@nestjs/common';
import { MessageService } from './message.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Message} from "./message.entity";
import {MessageUserFieldResolver} from "./resolvers/message-user-field-resolver";
import {TopicMessagesResolver} from "./resolvers/topic-messages-resolver";
import {MessageReactionsFieldResolver} from "./resolvers/message-reactions-field-resolver";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [
    MessageUserFieldResolver,
    MessageReactionsFieldResolver,
    TopicMessagesResolver,
    MessageService,
  ],
  exports: [MessageService],
})
export class MessageModule {}
