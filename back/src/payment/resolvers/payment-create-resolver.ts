import {Resolver, Mutation, Args, InputType, Field, Float} from '@nestjs/graphql';
import {Payment} from "../payment.entity";
import {PaymentService} from "../payment.service";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../auth/jwt-auth.guard";
import {GraphQLUpload} from "graphql-upload";
import {Upload} from "../../shared/shared.input";
import {CurrentUser} from "../../auth/current-user-decorator";
import {StrategyType} from "../../auth/types/strategy.type";
import {PaymentDocument} from "../../payment-document/payment-document.entity";
import {Document} from "../../document/document.entity";
import {upload} from "../../utils";
import {User} from "../../user/user.entity";
@InputType()
export class PaymentCartInput{
  @Field(() => String)
  id: string;
  @Field(() => Float)
  price: number;
}
@InputType()
export class CreatePaymentInput {
  @Field()
  note: string;

  @Field(() => [PaymentCartInput])
  documents: PaymentCartInput[];
}

@Resolver(() => Payment)
export class PaymentCreateResolver {
  constructor(private paymentService: PaymentService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Payment)
  async paymentCreate(
      @Args('input') input: CreatePaymentInput,
      @Args({ name: 'proof', type: () => GraphQLUpload }) file: Upload,
      @CurrentUser()strategy: StrategyType,
  ) {
    const { documents, ...res } = input;
    const payment = new Payment();
    payment.user = Object.assign(new User(), { id: strategy.id });
    payment.documents = documents.map(doc => {
      const pDoc = new PaymentDocument();
      pDoc.document = Object.assign(new Document(), { id: doc.id });
      pDoc.price = doc.price;
      return pDoc;
    })
    Object.assign(payment, res);

    const { filename } = await upload(file, 'payments');

    payment.proof = filename;

    return this.paymentService.save(payment);
  }
}
