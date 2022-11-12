import {Resolver, Mutation, Args, InputType, Field, Float} from '@nestjs/graphql';
import { DocumentService } from '../document.service';
import { Document } from '../document.entity';
import {Upload} from "../../shared/shared.input";
import {GraphQLUpload} from "graphql-upload";
import {removeFile, upload} from "../../utils";
import {Family} from "../../family/family.entity";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../auth/jwt-auth.guard";
import {CurrentUser} from "../../auth/current-user-decorator";
import {StrategyType} from "../../auth/types/strategy.type";
import {User} from "../../user/user.entity";
import {DocumentCreateInput} from "./document-create-resolver";

@InputType()
export class DocumentUpdateInput extends DocumentCreateInput{
  @Field(() => String)
  id: string;
}

@UseGuards(GqlAuthGuard)
@Resolver(() => Document)
export class DocumentUpdateResolver {
  constructor(private documentService: DocumentService) {}

  @Mutation(() => Document)
  async documentUpdate(
      @Args('input') input: DocumentUpdateInput,
      @Args({ name: 'files', type: () => [GraphQLUpload] })
          files: Upload[],
  ) {
    const { familyId, sizes, id, ...res } = input;
    const document = await this.documentService.findById(id);

    if(familyId)document.family = Object.assign(new Family(), { id: familyId });

    if(document.files.length && files.length) {
      document.files.forEach(fi => {
        removeFile(fi.name);
      });
      document.files = [];
      for (const file of files) {
        const folder = '/documents/'
        const { filename } = await upload(file, folder);
        document.files.push({
          name: folder + filename,
          size: sizes[files.indexOf(file)]
        });
      }
    }

    Object.assign(document, res);
    return this.documentService.save(document);
  }
}
