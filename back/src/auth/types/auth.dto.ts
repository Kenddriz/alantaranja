import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/user.entity';

@ObjectType()
export class AuthDto {
  @Field()
  id: number;
}

@ObjectType()
export class LoginDto {
  @Field()
  token: string;
  @Field(() => User)
  user: User;
}
