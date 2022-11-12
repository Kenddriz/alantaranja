import {Resolver, Mutation, Args, InputType, Field} from '@nestjs/graphql';
import { Document } from '../document.entity';
import {publicDir} from "../../utils";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../auth/jwt-auth.guard";
import {CurrentUser} from "../../auth/current-user-decorator";
import {StrategyType} from "../../auth/types/strategy.type";
import {copyFile, existsSync, mkdirSync} from "fs";

@InputType()
export class DocumentDownloadInput {
  @Field()
  url: string;

  @Field()
  paymentId: string;
}
@UseGuards(GqlAuthGuard)
@Resolver(() => Document)
export class DocumentDownloadResolver {

  @Mutation(() => String)
  async setupDocument(
      @Args('input') input: DocumentDownloadInput,
      @CurrentUser()strategy: StrategyType,
  ): Promise<string> {

    const pubDir = publicDir();

    const tmp = 'documents/' + input.paymentId + '/';

    const name = input.url.substring(input.url.lastIndexOf('/') + 1);


    if (!existsSync(pubDir + tmp)){
      mkdirSync(pubDir + tmp, { recursive: true });
    }

    const copy =  tmp + name + process.env.SITE_NAME;

    return new Promise<string>((resolve) => {
      copyFile(pubDir + input.url, pubDir + copy, (err) => {
        if (err) resolve('');
        else resolve(copy);
      });
    });
  }
}
