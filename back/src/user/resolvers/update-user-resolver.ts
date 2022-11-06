import { Args, Field, InputType, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user.service';
import { User } from '../user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/jwt-auth.guard';
import { Upload } from '../../shared/shared.input';
import { removeFile, upload } from '../../utils';
import { GraphQLUpload } from 'graphql-upload';
import {CurrentUser} from "../../auth/current-user-decorator";
import {StrategyType} from "../../auth/types/strategy.type";

@InputType()
export class UserUpdateInput {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  role?: number;

  @Field({ nullable: true })
  phone?: string;
}

@UseGuards(GqlAuthGuard)
@Resolver()
export class UpdateUserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async userUpdate(
    @Args('input') input: UserUpdateInput,
    @Args({ name: 'avatar', type: () => GraphQLUpload, nullable: true })
    image: Upload,
    @CurrentUser()strategy: StrategyType,
  ): Promise<User> {
    const { id, ...res } = input;
    const user = await this.userService.findOneById(id || strategy.id);
    Object.assign(user, res);
    if (image) {
      const folder = '/avatars/';
      if (user.avatar) removeFile(folder + user.avatar);
      const { filename } = await upload(image, folder);
      user.avatar = filename;
    }
    return this.userService.save(user);
  }
}
