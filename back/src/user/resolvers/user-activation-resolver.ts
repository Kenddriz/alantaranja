import {Args, Field, InputType, Int, Mutation, Resolver} from "@nestjs/graphql";
import {User} from "../user.entity";
import {UserService} from "../user.service";
import {UnauthorizedException} from "@nestjs/common";
import {EventEmitter2} from "@nestjs/event-emitter";
import {CONSTANTS} from "../listeners/user-constants";

@InputType()
export class UserVerifyEmailInput {

    @Field(() => String)
    email: string;

    @Field(() => String)
    activationCode: string;

}

@Resolver(() => User)
export class UserActivationResolver {
    constructor(
        private userService: UserService,
        private emitter: EventEmitter2,
    ) {}

    @Mutation(() => User)
    async userVerifyEmail(@Args('input') input: UserVerifyEmailInput): Promise<User> {
        const user = await this.userService.findOneByEmail(input.email);
        if (!user || user.activationCode !== Number(input.activationCode)) throw new UnauthorizedException('userNotFound');

        if(user.status !== 0) return user;

        user.status = 1;
        user.activationCode = 0;
        return new Promise<User>((resolve, reject) => {
            this.userService.save(user).then(user => {
                this.emitter.emit(CONSTANTS.userEmailVerifiedEvent, user);
                resolve(user);
            }).catch(er => reject(er));
        });
    }
}