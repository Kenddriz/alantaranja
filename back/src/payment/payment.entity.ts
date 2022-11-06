import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, RelationId
} from "typeorm";
import {User} from "../user/user.entity";
import {PaymentDocument} from "../payment-document/payment-document.entity";

@ObjectType()
@Entity({ name: 'payments' })
export class Payment {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 9, default: 'pending' })
  status: string; // pending, approved, refused

  @Field()
  @Column({ type: 'varchar', length: 255 })
  note: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  link?: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 255})
  proof: string;

  @Field(() => [PaymentDocument])
  @OneToMany(() => PaymentDocument, pDoc => pDoc.payment, { cascade: true })
  documents: PaymentDocument[];

  @Field({ nullable: true })
  @Column({ type: 'timestamp', name: 'download_at', nullable: true })
  downloadAt?: Date;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
  @RelationId((payment: Payment) => payment.user)
  userId: number;

  @Field()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
