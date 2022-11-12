import {Args, Field, InputType, ObjectType, Query, Resolver} from "@nestjs/graphql";
import {Document} from "../document.entity";
import {DocumentService} from "../document.service";
import {PaginationInput} from "../../shared/shared.input";
import {Meta} from "../../shared/shared.dto";

@ObjectType()
export class DocumentsPagination {
    @Field(() => [Document])
    items: Document[];

    @Field(() => Meta)
    meta: Meta;
}

@InputType()
export class DocumentsPaginationInput extends PaginationInput{
    @Field({ nullable: true })
    userId?: number;

    @Field(() => [Boolean])
    hidden: boolean[];

    @Field(() => [String])
    categories: string[];
}

@Resolver(() => Document)
export class DocumentPaginateResolver {
    constructor(private documentService: DocumentService) {}

    @Query(() => DocumentsPagination)
    async documentsPaginate(@Args('input')input: DocumentsPaginationInput):
        Promise<DocumentsPagination> {
        return this.documentService.paginate(input);
    }
}