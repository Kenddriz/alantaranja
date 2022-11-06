import {ResolveField, Resolver, Root} from "@nestjs/graphql";
import {Payment} from "../payment.entity";
import {PaymentDocument} from "../../payment-document/payment-document.entity";
import {PaymentDocumentService} from "../../payment-document/payment-document.service";

@Resolver(() => Payment)
export class PaymentDocumentFieldResolver {
    constructor(private paymentDocumentService: PaymentDocumentService) {}

    @ResolveField(() => [PaymentDocument])
    async documents(@Root()payment: Payment): Promise<PaymentDocument[]> {
        return this.paymentDocumentService.findByPayment(payment.id);
    }
}