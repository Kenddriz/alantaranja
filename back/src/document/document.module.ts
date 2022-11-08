import {Global, Module} from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentCreateResolver } from './resolvers/document-create-resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Document} from "./document.entity";
import {DocumentFamilyFieldResolver} from "./resolvers/document-family-field-resolver";
import {DocumentPaginateResolver} from "./resolvers/document-paginate-resolver";
import {DocumentSearchResolver} from "./resolvers/document-search-resolver";
import {DocumentRemoveResolver} from "./resolvers/document-remove-resolver";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  providers: [
    DocumentCreateResolver,
    DocumentRemoveResolver,
    DocumentFamilyFieldResolver,
    DocumentPaginateResolver,
    DocumentSearchResolver,
    DocumentService
  ],
  exports: [DocumentService]
})
export class DocumentModule {}
