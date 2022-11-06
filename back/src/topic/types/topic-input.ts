import {Field, InputType, ObjectType} from "@nestjs/graphql";

@InputType()
export class MessageCreateInput {
    @Field()
    body: string;

    @Field()
    topicId: string;

    @Field({ nullable: true })
    messageId?: string;
}

@InputType()
export class MessageReactionInput {
    @Field()
    messageId: string;

    @Field()
    label: string;
}

@InputType()
export class MessageUpdateInput {
    @Field()
    id: string;

    @Field()
    body: string;
}

@ObjectType()
export class MessageReaction {
    @Field()
    label: string;

    @Field()
    value: number;
}