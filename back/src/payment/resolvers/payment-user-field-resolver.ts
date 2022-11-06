import {ResolveField, Resolver, Root} from "@nestjs/graphql";
import {Payment} from "../payment.entity";
import {UserService} from "../../user/user.service";
import {User} from "../../user/user.entity";

@Resolver(() => Payment)
export class PaymentUserFieldResolver {
    constructor(private userService: UserService) {}

    @ResolveField(() => User)
    async user(@Root()payment: Payment): Promise<User> {
        return this.userService.findOneById(payment.userId);
    }
}