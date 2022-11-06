import {Args, Field, InputType, Mutation, Resolver} from "@nestjs/graphql";
import {TopicService} from "../topic.service";
import {Topic} from "../topic.entity";
import {Document} from "../../document/document.entity";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../auth/jwt-auth.guard";
import {CurrentUser} from "../../auth/current-user-decorator";
import {StrategyType} from "../../auth/types/strategy.type";
import {User} from "../../user/user.entity";

@InputType()
export class TopicCreateInput {
    @Field()
    title: string;

    @Field()
    body: string;

    @Field()
    documentId: string;
}
@UseGuards(GqlAuthGuard)
@Resolver()
export class TopicCreateResolver {
    constructor(private topicService: TopicService) {}

    @Mutation(() => Topic)
    async topicCreate(
        @Args('input')input: TopicCreateInput,
        @CurrentUser()strategy: StrategyType,
    ): Promise<Topic> {
        const { documentId, ...res} = input;
        const topic = new Topic();
        Object.assign(topic, res);
        topic.user = Object.assign(new User(), { id: strategy.id });
        if(documentId) topic.document = Object.assign(new Document(), { id: documentId });
        return this.topicService.save(topic);
    }
}