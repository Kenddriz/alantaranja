import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PaymentDocument} from "./payment-document.entity";
import {Repository} from "typeorm";

@Injectable()
export class PaymentDocumentService {
    constructor(
        @InjectRepository(PaymentDocument)
        private repository: Repository<PaymentDocument>
    ) {}

    async findByPayment(paymentId: string): Promise<PaymentDocument[]> {
        return this.repository.createQueryBuilder()
            .where('payment_id = :paymentId', { paymentId })
            .getMany();
    }
}
