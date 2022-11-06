import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor() {}
  @Query(() => String)
  findOne(): string {
    return 'Hello world';
  }
}
