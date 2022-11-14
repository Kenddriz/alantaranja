import {Args, Mutation, Resolver} from "@nestjs/graphql";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../auth/jwt-auth.guard";
import {TopicService} from "../topic.service";

@UseGuards(GqlAuthGuard)
@Resolver()
export class TopicRemoveResolver {
    constructor(private subjectService: TopicService) {}

    @Mutation(() => String)
    async topicRemove(@Args('id')id: string,): Promise<String> {
        return new Promise((resolve) => {
            this.subjectService.remove(id).then(count => {
                resolve(count ? id : '');
            }).catch(() => resolve(''));
        })
    }
}