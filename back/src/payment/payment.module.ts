import {Global, Module} from '@nestjs/common';
import { PaymentService } from './payment.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Payment} from "./payment.entity";
import {PaymentDocumentFieldResolver} from "./resolvers/payment-documents-field-resolver";
import {PaymentCreateResolver} from "./resolvers/payment-create-resolver";
import {PaymentPaginateResolver} from "./resolvers/payment-paginate-resolver";
import {MyPaymentsResolver} from "./resolvers/my-payments-resolver";
import {PaymentUserFieldResolver} from "./resolvers/payment-user-field-resolver";
import {PaymentStatusResolver} from "./resolvers/payment-status-resolver";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [
    PaymentDocumentFieldResolver,
    PaymentCreateResolver,
    PaymentPaginateResolver,
    MyPaymentsResolver,
    PaymentUserFieldResolver,
    PaymentStatusResolver,
    PaymentService
  ],
  exports: [PaymentService],
})
export class PaymentModule {}
