import {Args, Field, ObjectType, Query, Resolver} from "@nestjs/graphql";
import {PaginationInput} from "../../shared/shared.input";
import {Meta} from "../../shared/shared.dto";
import {TopicService} from "../topic.service";
import {Topic} from "../topic.entity";

@ObjectType()
export class TopicsPagination {
    @Field(() => [Topic])
    items: Topic[];

    @Field(() => Meta)
    meta: Meta;
}
@Resolver()
export class TopicsPaginateResolver {
    constructor(private topicService: TopicService) {}

    @Query(() => TopicsPagination)
    async topicsPaginate(@Args('input')input: PaginationInput): Promise<TopicsPagination> {
        return this.topicService.paginate(input);
    }
}