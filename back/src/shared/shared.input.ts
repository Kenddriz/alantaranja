import { Field, InputType, Int } from '@nestjs/graphql';
import { Stream } from 'stream';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

@InputType()
export class PaginationInput implements IPaginationOptions {
  @Field({ nullable: true })
  to?: string;

  @Field({ nullable: true })
  from?: string;

  @Field({ nullable: true })
  keyword?: string;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;
}

@InputType()
export class Upload {
  @Field()
  filename: string;

  @Field()
  mimetype: string;

  @Field()
  encoding: string;

  @Field(() => Stream)
  createReadStream: () => Stream;
}

@InputType()
export class EmailOptions {
  @Field({ nullable: true })
  from?: string;
  @Field({ nullable: true })
  cc?: string;
  @Field()
  to: string;
  @Field()
  subject: string;
  @Field()
  text: string;
}
