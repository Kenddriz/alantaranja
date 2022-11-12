import {Args, Field, Float, Int, ObjectType, Query, Resolver} from "@nestjs/graphql";
import {PaginationInput} from "../../shared/shared.input";
import {Payment} from "../payment.entity";
import {PaymentService} from "../payment.service";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../auth/jwt-auth.guard";
import {PaymentsPagination} from "./payment-paginate-resolver";
import {CurrentUser} from "../../auth/current-user-decorator";
import {StrategyType} from "../../auth/types/strategy.type";

@ObjectType()
export class PaymentsMonthlyOutput {
    @Field(() => Int)
    month: number;

    @Field(() => Float)
    amount: number;
}

@UseGuards(GqlAuthGuard)
@Resolver(() => Payment)
export class PaymentsMonthlyResolver {
    constructor(private paymentService: PaymentService) {}

    @Query(() => [PaymentsMonthlyOutput])
    async paymentsMonthly():
        Promise<PaymentsMonthlyOutput[]> {
        return this.paymentService.monthlyRevenue();
    }
}