import {ResolveField, Resolver, Root} from "@nestjs/graphql";
import {UserService} from "../../user/user.service";
import {Topic} from "../topic.entity";
import {User} from "../../user/user.entity";

@Resolver(() => Topic)
export class TopicUserFieldResolver {
    constructor(private userService: UserService) {}

    @ResolveField(() => User, { nullable: true })
    async user(@Root()topic: Topic): Promise<User> {
        return this.userService.findOneById(topic.userId);
    }
}