import {Resolver, Mutation, Args, InputType, Field, Float} from '@nestjs/graphql';
import { DocumentService } from '../document.service';
import { Document } from '../document.entity';
import {Upload} from "../../shared/shared.input";
import {GraphQLUpload} from "graphql-upload";
import { upload } from "../../utils";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../auth/jwt-auth.guard";

@InputType()
export class DocumentAddFilesInput {
  @Field(() => String)
  id: string;

  @Field(() => [Float])
  sizes: number[];
}


@UseGuards(GqlAuthGuard)
@Resolver(() => Document)
export class DocumentAddFilesResolver {
  constructor(private documentService: DocumentService) {}

  @Mutation(() => Document)
  async documentAddFiles(
      @Args('input') input: DocumentAddFilesInput,
      @Args({ name: 'files', type: () => [GraphQLUpload] })
          files: Upload[],
  ) {
    const document = await this.documentService.findById(input.id);

    if(document.files.length && files.length) {

      for (const file of files) {
        const folder = 'documents/'
        const { filename } = await upload(file, folder);
        document.files.push({
          name: folder + filename,
          size: input.sizes[files.indexOf(file)]
        });
      }
    }
    return this.documentService.save(document);
  }
}
