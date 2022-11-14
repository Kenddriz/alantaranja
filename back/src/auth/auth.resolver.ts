import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './types/auth.dto';
import { AuthInput } from './types/auth.input';
import { User } from '../user/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './current-user-decorator';
import { StrategyType } from './types/strategy.type';
import { UserService } from '../user/user.service';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Mutation(() => LoginDto)
  async login(@Args('input') input: AuthInput): Promise<LoginDto> {
    return new Promise<LoginDto>((resolve, reject) => {
      this.authService
          .validateUser(input)
          .then(user => {
            user.lastConnexion = new Date();
            this.userService.save(user)
                .then(async user => {
                  resolve({
                    token: await this.authService.login({
                      id: user.id,
                    }),
                    user,
                  })
                }).catch(err => reject(err));
          }).catch(err => reject(err));
    })
  }

  @Query(() => User, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async whoAmI(@CurrentUser() strategy: StrategyType): Promise<User> {
    return this.userService.findOneById(strategy.id);
  }
}
