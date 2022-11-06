import {Args, Field, ObjectType, Query, Resolver} from "@nestjs/graphql";
import {PaginationInput} from "../../shared/shared.input";
import {Meta} from "../../shared/shared.dto";
import {TopicService} from "../topic.service";
import {Topic} from "../topic.entity";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../auth/jwt-auth.guard";
import {CurrentUser} from "../../auth/current-user-decorator";
import {StrategyType} from "../../auth/types/strategy.type";

@ObjectType()
export class TopicsPagination {
    @Field(() => [Topic])
    items: Topic[];

    @Field(() => Meta)
    meta: Meta;
}
@UseGuards(GqlAuthGuard)
@Resolver()
export class TopicsPaginateResolver {
    constructor(private topicService: TopicService) {}

    @Query(() => TopicsPagination)
    async topicsPaginate(
        @Args('input')input: PaginationInput,
        @CurrentUser()strategy: StrategyType,
    ): Promise<TopicsPagination> {
        return this.topicService.paginate(input, strategy.id);
    }
}