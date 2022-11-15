import {Args, Field, InputType, ObjectType, Query, Resolver} from "@nestjs/graphql";
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

@InputType()
export class PaymentsPaginateInput extends PaginationInput {
    @Field(() => [String])
    status: string[];
}

@UseGuards(GqlAuthGuard)
@Resolver(() => Payment)
export class PaymentPaginateResolver {
    constructor(private paymentService: PaymentService) {}

    @Query(() => PaymentsPagination)
    async paymentsPaginate(@Args('input')input: PaymentsPaginateInput):
        Promise<PaymentsPagination> {
        return this.paymentService.paginate(input);
    }
}