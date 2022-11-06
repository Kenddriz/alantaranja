import {ResolveField, Resolver, Root} from "@nestjs/graphql";
import {Message} from "../message.entity";
import {ReactionService} from "../../reaction/reaction.service";
import {MessageReaction} from "../../topic/types/topic-input";

@Resolver(() => Message)
export class MessageReactionsFieldResolver {
    constructor(private reactionService: ReactionService) {}

    @ResolveField(() => [MessageReaction])
    async reactions(@Root()message: Message): Promise<MessageReaction[]> {
        if(!message.userId) return [];
        return this.reactionService.countByMessage(message.id);
    }
}