import {ResolveField, Resolver, Root} from "@nestjs/graphql";
import {Document} from "../document.entity";
import {UserService} from "../../user/user.service";
import {User} from "../../user/user.entity";

@Resolver(() => Document)
export class DocumentUserFieldResolver {
    constructor(private userService: UserService) {}

    @ResolveField(() => User)
    async user(@Root()document: Document): Promise<User> {
        if(!document.userId)return null;
        return this.userService.findOneById(document.userId);
    }
}