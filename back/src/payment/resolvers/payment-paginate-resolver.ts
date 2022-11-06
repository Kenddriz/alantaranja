import {Args, Field, ObjectType, Query, Resolver} from "@nestjs/graphql";
import {Meta} from "../../shared/shared.dto";
import {PaginationInput} from "../../shared/shared.input";
import {Payment} from "../payment.entity";
import {PaymentService} from "../payment.service";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../auth/jwt-auth.guard";

@ObjectType()
export class PaymentsPagination {
    @Field(() => [Payment])
    items: Payment[];

    @Field(() => Meta)
    meta: Meta;
}

@UseGuards(GqlAuthGuard)
@Resolver(() => Payment)
export class PaymentPaginateResolver {
    constructor(private paymentService: PaymentService) {}

    @Query(() => PaymentsPagination)
    async paymentsPaginate(@Args('input')input: PaginationInput):
        Promise<PaymentsPagination> {
        return this.paymentService.paginate(input);
    }
}