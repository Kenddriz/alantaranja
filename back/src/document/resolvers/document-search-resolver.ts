import {Args, Field, InputType, Query, Resolver} from "@nestjs/graphql";
import {DocumentService} from "../document.service";
import {Document} from "../document.entity";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "../../auth/jwt-auth.guard";
import {CurrentUser} from "../../auth/current-user-decorator";
import {StrategyType} from "../../auth/types/strategy.type";

@InputType()
export class SearchDocumentsInput {
    @Field()
    title: string;
}

@UseGuards(GqlAuthGuard)
@Resolver()
export class DocumentSearchResolver {
    constructor(private documentService: DocumentService) {}
    @Query(() => [Document])
    async documentsSearch(
        @Args('input') input: SearchDocumentsInput,
        @CurrentUser()strategy: StrategyType,
    ): Promise<Document[]> {
        return this.documentService.search(input.title, strategy.id);
    }
}