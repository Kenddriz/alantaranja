import {Args, Field, InputType, Mutation, Resolver} from "@nestjs/graphql";
import {TopicService} from "../topic.service";
import {Topic} from "../topic.entity";
import {Document} from "../../document/document.entity";
import {TopicCreateInput} from "./topic-create-resolver";

@InputType()
export class TopicUpdateInput extends TopicCreateInput {
    @Field()
    id: string;

    @Field()
    title: string;

    @Field()
    body: string;

    @Field()
    documentId: string;
}
@Resolver()
export class TopicUpdateResolver {
    constructor(private topicService: TopicService) {}

    @Mutation(() => Topic)
    async topicUpdate(@Args('input')input: TopicUpdateInput): Promise<Topic> {
        const { documentId, id, ...res} = input;
        const topic = await this.topicService.findOne(id);
        Object.assign(topic, res);
        if(documentId) topic.document = Object.assign(new Document(), { id: documentId });
        return this.topicService.save(topic);
    }
}