import {Args, Field, InputType, Mutation, Resolver} from "@nestjs/graphql";
import {User} from "../user.entity";
import {UserService} from "../user.service";
import {UnauthorizedException} from "@nestjs/common";
import {hashSync} from "bcrypt";
import {CONSTANTS} from "../listeners/user-constants";
import {EventEmitter2} from "@nestjs/event-emitter";

@InputType()
export class ResetPasswordInput {
    @Field(() => String)
    password: string;
    @Field(() => String)
    code: string;
    @Field(() => String)
    email: string;
}
@Resolver(() => User)
export class ResetPasswordResolver {
    constructor(
        private userService: UserService,
        private emitter: EventEmitter2,
    ) {}

    @Mutation(() => User)
    async resetPassword(@Args('input') input: ResetPasswordInput): Promise<User> {
        const user = await this.userService.findOneByEmail(input.email);
        if (user.resetPasswordCode === Number(input.code)) {
            user.password = hashSync(input.password, 10);
            if(user.activationCode > 0) {
                user.activationCode = 0;
                this.emitter.emit(CONSTANTS.userEmailVerifiedEvent, user);
            }
            return this.userService.save(user);
        }
        throw new UnauthorizedException('codeWrong');
    }
}