import {Args, Field, InputType, Query, Resolver} from "@nestjs/graphql";
import {DocumentService} from "../document.service";
import {Document} from "../document.entity";

@InputType()
export class SearchDocumentsInput {
    @Field()
    title: string;
}
@Resolver()
export class DocumentSearchResolver {
    constructor(private documentService: DocumentService) {
    }
    @Query(() => [Document])
    async documentsSearch(@Args('input') input: SearchDocumentsInput): Promise<Document[]> {
        return this.documentService.search(input.title);
    }
}