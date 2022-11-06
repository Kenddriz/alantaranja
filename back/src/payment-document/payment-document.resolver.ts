import { Resolver } from '@nestjs/graphql';
import { PaymentDocumentService } from './payment-document.service';

@Resolver()
export class PaymentDocumentResolver {
  constructor(private readonly paymentDocumentService: PaymentDocumentService) {}
}
