import {Field, Float, Int, ObjectType, Query, Resolver} from '@nestjs/graphql';
import {UserService} from "./user/user.service";
import {TopicService} from "./topic/topic.service";
import {DocumentService} from "./document/document.service";
import {PaymentService} from "./payment/payment.service";

@ObjectType()
export class Overview {
  @Field(() => Int)
  users: number;

  @Field(() => Int)
  topics: number;

  @Field(() => Float)
  revenue: number;

  @Field(() => Int)
  documents: number;
}
@Resolver()
export class AppResolver {
  constructor(
      private userService: UserService,
      private topicService: TopicService,
      private documentService: DocumentService,
      private paymentService: PaymentService,
  ) {}
  @Query(() => Overview)
  async overviews() {
    return {
      users: this.userService.count(),
      topics: this.topicService.count(),
      documents: this.documentService.count(),
      revenue: this.paymentService.salesRevenue(),
    }
  }
}
