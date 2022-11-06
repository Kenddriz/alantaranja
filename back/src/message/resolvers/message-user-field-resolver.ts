import {ResolveField, Resolver, Root} from "@nestjs/graphql";
import {UserService} from "../../user/user.service";
import {User} from "../../user/user.entity";
import {Message} from "../message.entity";

@Resolver(() => Message)
export class MessageUserFieldResolver {
    constructor(private userService: UserService) {}

    @ResolveField(() => User, { nullable: true })
    async user(@Root()message: Message): Promise<User> {
        if(!message.userId) return null;
        return this.userService.findOneById(message.userId);
    }
}