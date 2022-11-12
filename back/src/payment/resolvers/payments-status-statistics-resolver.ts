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
export class PaymentsStatusStatisticsOutput {
    @Field(() => Int)
    count: number;

    @Field(() => String)
    status: string;

    @Field(() => Float)
    amount: number;
}

@UseGuards(GqlAuthGuard)
@Resolver(() => Payment)
export class PaymentsStatusStatisticsResolver {
    constructor(private paymentService: PaymentService) {}

    @Query(() => [PaymentsStatusStatisticsOutput])
    async paymentsStatusStatistics():
        Promise<PaymentsStatusStatisticsOutput[]> {
        return this.paymentService.statusStatistics();
    }
}