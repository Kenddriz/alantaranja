import {Args, Field, InputType, Mutation, Resolver} from "@nestjs/graphql";
import {User} from "../user.entity";
import {UserService} from "../user.service";
import {UnauthorizedException} from "@nestjs/common";
import {genCode, sendMail} from "../../utils";

@InputType()
export class SendCodeInput {
    @Field(() => String)
    email: string;
}
@Resolver(() => User)
export class SendCodeResolver {
    constructor(private userService: UserService) {}

    @Mutation(() => Boolean)
    async sendCode(
        @Args('input') input: SendCodeInput,
    ): Promise<boolean> {
        const user = await this.userService.findOneByEmail(input.email);
        if (!user) throw new UnauthorizedException('notFound');

        const code = genCode();
        return new Promise((resolve) => {
            sendMail({
                from: process.env.EMAIL_USERNAME,
                to: input.email,
                subject: 'Envoi du code pin',
                text: 'Code de réinitialisation:' + code,
            })
                .then((status: boolean) => {
                    if(status) {
                        user.resetPasswordCode = code;
                        this.userService.save(user);
                    }
                    resolve(status);
                })
                .catch(() => resolve(false));
        });
    }
}