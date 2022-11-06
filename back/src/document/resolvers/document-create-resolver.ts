import {Resolver, Mutation, Args, InputType, Field, Float} from '@nestjs/graphql';
import { DocumentService } from '../document.service';
import { Document } from '../document.entity';
import {Upload} from "../../shared/shared.input";
import {GraphQLUpload} from "graphql-upload";
import {upload} from "../../utils";
import {Family} from "../../family/family.entity";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../auth/jwt-auth.guard";
import {CurrentUser} from "../../auth/current-user-decorator";
import {StrategyType} from "../../auth/types/strategy.type";
import {User} from "../../user/user.entity";

@InputType()
export class DocumentCreateInput {
  @Field(() => String, { nullable: true })
  familyId?: string;

  @Field(() => String)
  title: string;

  @Field(() => [Float])
  sizes: number[];

  @Field(() => String)
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => Boolean)
  hidden: number;
}

@UseGuards(GqlAuthGuard)
@Resolver(() => Document)
export class DocumentCreateResolver {
  constructor(private documentService: DocumentService) {}

  @Mutation(() => Document)
  async documentCreate(
      @Args('input') input: DocumentCreateInput,
      @Args({ name: 'files', type: () => [GraphQLUpload] })
          files: Upload[],
      @CurrentUser()strategy: StrategyType,
  ) {
    const document = new Document();
    const { familyId, sizes, ...res } = input;
    document.user = Object.assign(new User(), { id: strategy.id });
    if(familyId)document.family = Object.assign(new Family(), { id: familyId });
    document.files = [];
    for (const file of files) {
      const folder = '/documents/'
      const { filename } = await upload(file, folder);
      document.files.push({
        name: folder + filename,
        size: sizes[files.indexOf(file)]
      });
    }
    Object.assign(document, res);
    return this.documentService.save(document);
  }
}
