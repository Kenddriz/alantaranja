import {Args, Field, ObjectType, Query, Resolver} from "@nestjs/graphql";
import {PaginationInput} from "../../shared/shared.input";
import {UserService} from "../user.service";
import {User} from "../user.entity";
import {Meta} from "../../shared/shared.dto";

@ObjectType()
export class UsersPagination {
    @Field(() => [User])
    items: User[];

    @Field(() => Meta)
    meta: Meta;
}
@Resolver()
export class UsersPaginateResolver {
    constructor(private userService: UserService) {}

    @Query(() => UsersPagination)
    async usersPaginate(@Args('input')input: PaginationInput): Promise<UsersPagination> {
        return this.userService.paginate(input);
    }
}