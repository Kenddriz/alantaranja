import {Field, ObjectType} from "@nestjs/graphql";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId} from "typeorm";
import {Document} from "../document/document.entity";
import {Payment} from "../payment/payment.entity";

@ObjectType()
@Entity({ name: 'payment_documents' })
export class PaymentDocument {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => Document)
    @ManyToOne(() => Document)
    @JoinColumn({ name: 'document_id'})
    document: Document;
    @RelationId((pDoc: PaymentDocument) => pDoc.document)
    documentId: string;

    @ManyToOne(() => Payment, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'payment_id'})
    payment: Payment;
    @RelationId((pDoc: PaymentDocument) => pDoc.payment)
    paymentId: string;

    @Field()
    @Column({ type: 'float' })
    price: number;
}
