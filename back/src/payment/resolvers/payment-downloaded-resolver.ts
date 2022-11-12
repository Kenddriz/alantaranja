import {Resolver, Mutation, Args } from '@nestjs/graphql';
import {Payment} from "../payment.entity";
import {PaymentService} from "../payment.service";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../auth/jwt-auth.guard";
import {publicDir} from "../../utils";
import {rmSync} from "fs";

@Resolver(() => Payment)
export class PaymentDownloadedResolver {
  constructor(private paymentService: PaymentService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Payment)
  async paymentDownloaded(@Args('id') id: string) {

    const pubDir = publicDir();

    const tmp = 'documents/' + id + '/';

    rmSync(pubDir + tmp, { recursive: true, force: true });

    const payment = await this.paymentService.findOneById(id);

    payment.downloadAt = new Date();

    return this.paymentService.save(payment);
  }
}
