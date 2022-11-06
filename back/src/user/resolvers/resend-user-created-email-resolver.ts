import {Args, Mutation, Resolver} from "@nestjs/graphql";
import {User} from "../user.entity";
import {UserService} from "../user.service";
import {UnauthorizedException} from "@nestjs/common";
import {UserCreatedListener} from "../listeners/user-created.listener";

@Resolver(() => User)
export class ResendUserCreatedEmailResolver {
    constructor(private userService: UserService) {}

    @Mutation(() => Boolean)
    async userResendEmailCreated(@Args('email') email: string): Promise<boolean> {
        const user = await this.userService.findOneByEmail(email);
        if (!user) throw new UnauthorizedException('userNotFound');
        return UserCreatedListener.send(user);
    }
}