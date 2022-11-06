import {Args, Query, Resolver} from "@nestjs/graphql";
import {Topic} from "../../topic/topic.entity";
import {MessageService} from "../message.service";
import {Message} from "../message.entity";

@Resolver(() => Message)
export class TopicMessagesResolver {
    constructor(private messageService: MessageService) {}

    @Query(() => [Message])
    async topicMessages(@Args('topicId')topicId: string): Promise<Message[]> {
        return this.messageService.findByByTopic(topicId);
    }
}