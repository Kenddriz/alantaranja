import {ResolveField, Resolver, Root} from "@nestjs/graphql";
import {PaymentDocument} from "../payment-document.entity";
import {DocumentService} from "../../document/document.service";
import {Document} from "../../document/document.entity";

@Resolver(() => PaymentDocument)
export class PaymentDocumentsFieldResolver {
    constructor(private documentService: DocumentService) {}

    @ResolveField(() => Document, { nullable: true })
    async document(@Root()paymentDocument: PaymentDocument): Promise<Document> {
        return this.documentService.findById(paymentDocument.documentId);
    }
}