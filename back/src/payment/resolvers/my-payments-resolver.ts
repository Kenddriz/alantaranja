import {Args, Query, Resolver} from "@nestjs/graphql";
import {Payment} from "../payment.entity";
import {PaymentService} from "../payment.service";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../auth/jwt-auth.guard";
import {PaymentsPaginateInput, PaymentsPagination} from "./payment-paginate-resolver";
import {CurrentUser} from "../../auth/current-user-decorator";
import {StrategyType} from "../../auth/types/strategy.type";


@UseGuards(GqlAuthGuard)
@Resolver(() => Payment)
export class MyPaymentsResolver {
    constructor(private paymentService: PaymentService) {}

    @Query(() => PaymentsPagination)
    async myPaymentsPaginate(
        @Args('input')input: PaymentsPaginateInput,
        @CurrentUser()strategy: StrategyType,
    ):
        Promise<PaymentsPagination> {
        return this.paymentService.paginate(input, strategy.id);
    }
}