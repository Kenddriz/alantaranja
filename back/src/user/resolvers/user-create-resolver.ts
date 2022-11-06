import {Resolver, Mutation, Args, InputType, Field} from '@nestjs/graphql';
import { UserService } from '../user.service';
import { User } from '../user.entity';
import { hashSync } from 'bcrypt';
import {EventEmitter2} from "@nestjs/event-emitter";
import {CONSTANTS} from "../listeners/user-constants";
import {GraphQLUpload} from "graphql-upload";
import {Upload} from "../../shared/shared.input";
import {genCode, upload} from "../../utils";

@InputType()
export class UserCreateInput {

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  role: number;

  @Field()
  phone: string;

  @Field()
  password: string;

}

@Resolver(() => User)
export class UserCreateResolver {
  constructor(
      private readonly userService: UserService,
      private eventEmitter: EventEmitter2,
  ) {}

  @Mutation(() => User)
  async userCreate(
      @Args('input') input: UserCreateInput,
      @Args({ name: 'avatar', type: () => GraphQLUpload, nullable: true }) avatar: Upload
  ) {
    const user = new User();
    user.activationCode = genCode();
    Object.assign(user, input);
    user.password = hashSync(input.password, 10);

    if(avatar) {
      const { filename } = await upload(avatar, 'avatars');
      user.avatar = filename;
    }

    return new Promise<User>((resolve, reject) => {
      this.userService
        .save(user)
        .then((user) => {
          this.eventEmitter.emit(CONSTANTS.userCreatedEvent, user);
          resolve(user);
        })
        .catch((err) => reject(err));
    });
  }
}
