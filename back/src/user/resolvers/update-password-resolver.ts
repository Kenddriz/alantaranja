import { Args, Field, InputType, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user.service';
import { compareSync, hashSync } from 'bcrypt';
import { CurrentUser } from '../../auth/current-user-decorator';
import { User } from '../user.entity';
import { StrategyType } from '../../auth/types/strategy.type';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/jwt-auth.guard';

@InputType()
export class UpdatePasswordInput {
  @Field()
  currentPassword: string;
  @Field()
  newPassword: string;
}

@UseGuards(GqlAuthGuard)
@Resolver(() => User)
export class UpdatePasswordResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User, { nullable: true })
  async updatePassword(
    @CurrentUser() strategy: StrategyType,
    @Args('input') input: UpdatePasswordInput,
  ): Promise<User> {
    const user = await this.userService.findOneById(strategy.id);
    const matched = await compareSync(input.currentPassword, user.password);
    if (!matched) throw new UnauthorizedException('wrongCurrentPassword');
    user.password = hashSync(input.newPassword, 10);
    return this.userService.save(user);
  }
}
