import {Global, Module} from '@nestjs/common';
import { PaymentDocumentService } from './payment-document.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PaymentDocument} from "./payment-document.entity";
import {PaymentDocumentsFieldResolver} from "./resolvers/payment-document-field-resolver";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([PaymentDocument])],
  providers: [
    PaymentDocumentsFieldResolver,
    PaymentDocumentService
  ],
  exports: [PaymentDocumentService]
})
export class PaymentDocumentModule {}
