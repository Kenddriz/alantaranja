import {Resolver, Mutation, Args } from '@nestjs/graphql';
import { DocumentService } from '../document.service';
import { Document } from '../document.entity';
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../auth/jwt-auth.guard";
import {removeFile} from "../../utils";


@UseGuards(GqlAuthGuard)
@Resolver(() => Document)
export class DocumentRemoveResolver {
  constructor(private documentService: DocumentService) {}

  @Mutation(() => String)
  async documentRemove(@Args('id') id: string) {
    return new Promise<string>((resolve) => {
        this.documentService.findById(id)
            .then(doc => {
                this.documentService.remove(doc)
                    .then(doc => {
                        if(doc) {
                            doc.files.forEach(file => {
                                removeFile(file.name);
                            })
                            resolve(id);
                        } else resolve('');
                    }).catch(() => resolve(''));
            }).catch(() => resolve(''));
    });

  }
}
