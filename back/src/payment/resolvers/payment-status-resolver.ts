import {Resolver, Mutation, Args, InputType, Field} from '@nestjs/graphql';
import {Payment} from "../payment.entity";
import {PaymentService} from "../payment.service";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../auth/jwt-auth.guard";

@InputType()
export class PaymentStatusInput {
  @Field()
  id: string;

  @Field()
  status: string;
}

@Resolver(() => Payment)
export class PaymentStatusResolver {
  constructor(private paymentService: PaymentService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Payment)
  async paymentStatus(@Args('input') input: PaymentStatusInput) {

    const payment = await this.paymentService.findOneById(input.id);

    Object.assign(payment, input);

    return this.paymentService.save(payment);
  }
}
